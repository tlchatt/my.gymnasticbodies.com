/**
 * testCourseLibrary.js — Puppeteer test for new course library courses
 *
 * Tests all new courses added in the 2026-06-30 session:
 *   - Foundation Intro (sub-course under Foundation)
 *   - Restore (7 sub-courses)
 *   - Fundamentals (20 days)
 *   - Elements (E1, E2)
 *   - Thrive (opens drawer via customAction)
 *   - Classes (routes to /class-finder via customAction)
 *   - Regression: existing courses still work (Handstand, Stretch)
 *
 * Usage:
 *   node claudeTools/testCourseLibrary.js
 *   node claudeTools/testCourseLibrary.js --visible   (shows browser)
 */

const puppeteer = require('/var/www/Work/Gymfit/claudeTools/node_modules/puppeteer');

const BASE_URL = 'https://my.gymnasticbodies.com';
const EMAIL    = 'yeldaour@gmail.com';
const PASSWORD = '34216Albaqara';
const HEADLESS = !process.argv.includes('--visible');

// ─── helpers ──────────────────────────────────────────────────────────────────

let passed = 0, failed = 0;
const results = [];

function log(status, label, detail = '') {
  const icon = status === 'PASS' ? '✓' : '✗';
  const msg = `  ${icon} ${label}${detail ? ' — ' + detail : ''}`;
  console.log(msg);
  results.push({ status, label, detail });
  if (status === 'PASS') passed++; else failed++;
}

async function waitAndClick(page, selector, timeout = 10000) {
  await page.waitForSelector(selector, { visible: true, timeout });
  await page.click(selector);
}

async function findCourseCard(page, title) {
  return page.evaluate((t) => {
    const cards = Array.from(document.querySelectorAll('h2'));
    return cards.some(el => el.textContent.trim() === t);
  }, title);
}

async function clickCourseCard(page, title) {
  // Use Puppeteer native click (moves mouse + dispatches events) so React 17 picks it up
  const handle = await page.evaluateHandle((t) => {
    const cards = Array.from(document.querySelectorAll('h2'));
    const el = cards.find(c => c.textContent.trim() === t);
    if (!el) return null;
    return el.closest('.MuiCardActionArea-root') || el.closest('[role="button"]') || el.closest('button');
  }, title);
  if (handle) {
    const el = handle.asElement();
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await el.click();
    }
  }
}

// Wait until a card with given title appears (polls up to maxMs)
async function waitForCard(page, title, maxMs = 8000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    const found = await findCourseCard(page, title);
    if (found) return true;
    await sleep(300);
  }
  return false;
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ─── login ─────────────────────────────────────────────────────────────────────

async function login(page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(1000);

  // Fill email
  const emailSel = 'input[type="email"], input[name="email"], input[placeholder*="email" i]';
  await page.waitForSelector(emailSel, { timeout: 10000 });
  await page.type(emailSel, EMAIL);

  // Fill password
  const pwSel = 'input[type="password"]';
  await page.waitForSelector(pwSel, { timeout: 5000 });
  await page.type(pwSel, PASSWORD);

  // Submit
  await page.keyboard.press('Enter');
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
  await sleep(2000);

  const url = page.url();
  if (url.includes('/dashboard') || url.includes('/get-started') || !url.includes('?')) {
    log('PASS', 'Login', `landed on ${url}`);
    return true;
  }
  log('FAIL', 'Login', `unexpected URL: ${url}`);
  return false;
}

// ─── test groups ───────────────────────────────────────────────────────────────

async function testTopLevelCards(page) {
  console.log('\n── Top-level course cards ──');
  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const expected = ['Foundation', 'Handstand', 'Stretch', 'Movement', 'Rings',
                    'Restore', 'Fundamentals', 'Elements', 'Thrive', 'Classes'];

  for (const name of expected) {
    const found = await findCourseCard(page, name);
    log(found ? 'PASS' : 'FAIL', `Card visible: ${name}`);
  }
}

async function testFoundationIntro(page) {
  console.log('\n── Foundation Intro sub-course ──');
  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  await clickCourseCard(page, 'Foundation');
  const hasIntro = await waitForCard(page, 'Foundation Intro');
  log(hasIntro ? 'PASS' : 'FAIL', 'Foundation Intro sub-course card visible');

  if (!hasIntro) return;

  await clickCourseCard(page, 'Foundation Intro');
  // Wait for third-row video cards (API call → catch → state update)
  const hasFirstVideo = await waitForCard(page, 'Introduction to Front Lever');
  log(hasFirstVideo ? 'PASS' : 'FAIL', 'Foundation Intro third row: Introduction to Front Lever card visible');

  const thirdRowCards = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h2')).map(c => c.textContent.trim())
      .filter(t => t.startsWith('Introduction to') || t === 'MyGB Walkthrough');
  });
  log(thirdRowCards.length === 8 ? 'PASS' : 'FAIL', `Foundation Intro has 8 video cards`, `found ${thirdRowCards.length}`);

  if (thirdRowCards.length > 0) {
    await clickCourseCard(page, thirdRowCards[0]);
    await sleep(1500);
    const hasPlaylistRow = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h5')).some(el => el.textContent.includes('Introduction to'));
    });
    log(hasPlaylistRow ? 'PASS' : 'FAIL', 'Foundation Intro PlaylistRow rendered');
  }
}

async function testRestore(page) {
  console.log('\n── Restore (7 sub-courses) ──');
  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  await clickCourseCard(page, 'Restore');
  await sleep(1500);

  const restoreSubs = [
    'Ankle & Knee Restore', 'Hip Restore', 'Hamstring Restore', 'Quad Restore',
    'Thoracic Restore', 'Scapula Restore', 'Shoulder Restore'
  ];

  for (const name of restoreSubs) {
    const found = await findCourseCard(page, name);
    log(found ? 'PASS' : 'FAIL', `Sub-course visible: ${name}`);
  }

  // Drill into Ankle & Knee Restore
  await clickCourseCard(page, 'Ankle & Knee Restore');
  const hasFollowAlong = await waitForCard(page, 'Ankle Follow Along');
  log(hasFollowAlong ? 'PASS' : 'FAIL', 'Ankle & Knee third row: Ankle Follow Along card visible');

  const exerciseCards = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h2')).map(c => c.textContent.trim())
      .filter(t => ['Ankle Follow Along','Calf Raises','Deepest Squat','Skiers','Natural Leg Extensions'].includes(t));
  });
  log(exerciseCards.length >= 4 ? 'PASS' : 'FAIL', `Ankle & Knee third row cards visible`, `found ${exerciseCards.length}`);

  // Click one and verify PlaylistRow
  if (hasFollowAlong) {
    await clickCourseCard(page, 'Ankle Follow Along');
    await sleep(1500);
    const hasPlaylistRow = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h5')).some(el =>
        el.textContent.includes('Follow Along')
      );
    });
    log(hasPlaylistRow ? 'PASS' : 'FAIL', 'Restore PlaylistRow rendered');
  }
}

async function testFundamentals(page) {
  console.log('\n── Fundamentals (spot-check Days 1, 5, 20) ──');
  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  await clickCourseCard(page, 'Fundamentals');
  await sleep(1500);

  const spotCheck = ['Fundamentals Day 1', 'Fundamentals Day 5', 'Fundamentals Day 20'];
  for (const name of spotCheck) {
    const found = await findCourseCard(page, name);
    log(found ? 'PASS' : 'FAIL', `Sub-course visible: ${name}`);
  }

  // Count all 20 day cards
  const dayCount = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h2'))
      .filter(el => /^Fundamentals Day \d+$/.test(el.textContent.trim())).length;
  });
  log(dayCount === 20 ? 'PASS' : 'FAIL', `All 20 Fundamentals day cards present`, `found ${dayCount}`);

  // Drill into Day 1
  await clickCourseCard(page, 'Fundamentals Day 1');
  const hasWorkoutCard = await waitForCard(page, 'Day 1 - Workout');
  log(hasWorkoutCard ? 'PASS' : 'FAIL', 'Day 1 - Workout card visible');
  const hasTechCard = await waitForCard(page, 'Day 1 - Technique');
  log(hasTechCard ? 'PASS' : 'FAIL', 'Day 1 - Technique card visible');

  if (hasWorkoutCard) {
    await clickCourseCard(page, 'Day 1 - Workout');
    await sleep(1500);
    const hasPlaylistRow = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h5')).some(el => el.textContent.includes('Day 1'));
    });
    log(hasPlaylistRow ? 'PASS' : 'FAIL', 'Fundamentals Day 1 PlaylistRow rendered');
  }
}

async function testElements(page) {
  console.log('\n── Elements (E1 & E2) ──');
  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  await clickCourseCard(page, 'Elements');
  await sleep(1500);

  for (const name of ['Elements 1', 'Elements 2']) {
    const found = await findCourseCard(page, name);
    log(found ? 'PASS' : 'FAIL', `Sub-course visible: ${name}`);
  }

  // Drill into Elements 1
  await clickCourseCard(page, 'Elements 1');
  const hasWk1Core = await waitForCard(page, 'Week 1 - Core & Lower Body');
  log(hasWk1Core ? 'PASS' : 'FAIL', 'Elements 1 third row: Week 1 - Core & Lower Body card visible');

  const weekCards = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h2')).map(c => c.textContent.trim())
      .filter(t => /^Week \d+/.test(t));
  });
  log(weekCards.length === 10 ? 'PASS' : 'FAIL', `Elements 1 has 10 week cards`, `found ${weekCards.length}`);

  if (hasWk1Core) {
    await clickCourseCard(page, 'Week 1 - Core & Lower Body');
    await sleep(1500);
    const hasPlaylistRow = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h5')).some(el => el.textContent.includes('Week 1'));
    });
    log(hasPlaylistRow ? 'PASS' : 'FAIL', 'Elements 1 PlaylistRow rendered');
  }
}

async function testThrive(page) {
  console.log('\n── Thrive (opens drawer) ──');
  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  await clickCourseCard(page, 'Thrive');
  await sleep(2000);

  // Check that a drawer/modal appeared
  const drawerOpen = await page.evaluate(() => {
    // MUI Drawer renders with role="presentation" or a drawer-specific class
    return !!(
      document.querySelector('[class*="MuiDrawer-paper"]') ||
      document.querySelector('[class*="drawer"]') ||
      document.querySelector('[role="dialog"]')
    );
  });
  log(drawerOpen ? 'PASS' : 'FAIL', 'Thrive drawer opened');
}

async function testClasses(page) {
  console.log('\n── Classes (routes to /class-finder) ──');
  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Capture all URL changes after the click
  const urlsBefore = page.url();
  await clickCourseCard(page, 'Classes');

  // Wait up to 5s for URL to change to /class-finder
  let finalUrl = page.url();
  const start = Date.now();
  while (!finalUrl.includes('/class-finder') && Date.now() - start < 5000) {
    await sleep(300);
    finalUrl = page.url();
  }

  log(finalUrl.includes('/class-finder') ? 'PASS' : 'FAIL', 'Classes navigates to /class-finder', finalUrl);
}

async function testExistingCourses(page) {
  console.log('\n── Regression: existing courses ──');
  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Handstand sub-courses
  await clickCourseCard(page, 'Handstand');
  await sleep(1500);
  for (const name of ['Handstand 1', 'Handstand 2', 'Handstand 3']) {
    const found = await findCourseCard(page, name);
    log(found ? 'PASS' : 'FAIL', `Regression: ${name} still visible`);
  }

  // Drill into Handstand 1 and verify ProgressionRows (not PlaylistRow)
  await clickCourseCard(page, 'Handstand 1');
  await sleep(2000);
  const thirdRowItems = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h2')).map(c => c.textContent.trim()).filter(Boolean);
  });
  log(thirdRowItems.length > 0 ? 'PASS' : 'FAIL', `Regression: Handstand 1 third row has ${thirdRowItems.length} items`);

  // Click a known third-row exercise card — wait for "Exercise videos" heading (ProgressionRows)
  // Handstand 1 exercises from AWS: "Wrist stretches #1-4" is a reliable known name
  if (thirdRowItems.length > 0) {
    // Click first item specifically; use h2 index rather than title search to avoid row confusion
    await page.evaluate(() => {
      // Only click h2s that are NOT in the first two rows — the first 5 h2s are main course cards
      // (Foundation, Handstand, Stretch, Movement, Rings), next 3 are second-row (Handstand 1/2/3)
      // Third row starts after that
      const all = Array.from(document.querySelectorAll('h2'));
      const thirdRowEl = all.slice(8)[0]; // skip first/second row cards
      if (thirdRowEl) {
        const btn = thirdRowEl.closest('.MuiCardActionArea-root');
        if (btn) btn.click();
      }
    });
    await sleep(2500);
    const hasProgressionRows = await page.evaluate(() => {
      // ProgressionRows renders a Typography h6 "Exercise videos"
      return Array.from(document.querySelectorAll('h6')).some(el => el.textContent.trim() === 'Exercise videos');
    });
    log(hasProgressionRows ? 'PASS' : 'FAIL', 'Regression: ProgressionRows still renders for Handstand 1');
  }

  // Stretch courses
  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  await clickCourseCard(page, 'Stretch');
  await sleep(1500);
  const hasMiddleSplit = await findCourseCard(page, 'Stretch Series - Middle Split');
  log(hasMiddleSplit ? 'PASS' : 'FAIL', 'Regression: Stretch Series - Middle Split still visible');
}

// ─── main ──────────────────────────────────────────────────────────────────────

(async () => {
  console.log(`\nCourse Library Test Suite — ${BASE_URL}/course-library`);
  console.log(`Headless: ${HEADLESS}`);
  console.log('─'.repeat(60));

  const browser = await puppeteer.launch({
    headless: HEADLESS,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 900 },
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(15000);

  // suppress console noise from the page
  page.on('console', () => {});
  page.on('pageerror', () => {});

  try {
    const loggedIn = await login(page);
    if (!loggedIn) {
      console.log('\nAborting — login failed.');
      await browser.close();
      process.exit(1);
    }

    await testTopLevelCards(page);
    await testFoundationIntro(page);
    await testRestore(page);
    await testFundamentals(page);
    await testElements(page);
    await testThrive(page);
    await testClasses(page);
    await testExistingCourses(page);

  } catch (err) {
    console.error('\nUnhandled error:', err.message);
    failed++;
  } finally {
    await browser.close();
  }

  console.log('\n' + '─'.repeat(60));
  console.log(`Results: ${passed} passed, ${failed} failed`);
  if (failed > 0) {
    console.log('\nFailed tests:');
    results.filter(r => r.status === 'FAIL').forEach(r => console.log(`  ✗ ${r.label}${r.detail ? ' — ' + r.detail : ''}`));
  }
  process.exit(failed > 0 ? 1 : 0);
})();
