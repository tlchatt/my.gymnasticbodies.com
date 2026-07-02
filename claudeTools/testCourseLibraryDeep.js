/**
 * testCourseLibraryDeep.js
 * Deep end-to-end test: clicks all the way through to video player for each new course.
 * Also spot-checks existing courses (regression).
 */
const puppeteer = require('/var/www/Work/Gymfit/claudeTools/node_modules/puppeteer');

const BASE_URL = 'https://my.gymnasticbodies.com';
const EMAIL    = 'yeldaour@gmail.com';
const PASSWORD = '34216Albaqara';

const PASS = '✓';
const FAIL = '✗';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function clickH2(page, title) {
  const found = await page.evaluate((t) => {
    const el = Array.from(document.querySelectorAll('h2')).find(e => e.textContent.trim() === t);
    if (!el) return false;
    const btn = el.closest('.MuiCardActionArea-root') || el.closest('[role="button"]') || el.closest('button');
    if (btn) { btn.click(); return true; }
    return false;
  }, title);
  if (!found) console.log(`  !! h2 not found: "${title}"`);
  return found;
}

// Click the Nth h2 (0-indexed) by scrolling to it and using mouse.click at its position
async function clickH2AtIndex(page, idx) {
  await page.evaluate((i) => {
    const el = document.querySelectorAll('h2')[i];
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  }, idx);
  await sleep(300);
  const pos = await page.evaluate((i) => {
    const el = document.querySelectorAll('h2')[i];
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, text: el.textContent.trim() };
  }, idx);
  if (!pos) { console.log(`  !! h2 index ${idx} not found`); return false; }
  await page.mouse.click(pos.x, pos.y);
  return pos.text;
}

// Click the LAST h2 with this exact title (group cards appear after sub-course cards)
async function clickLastH2(page, title) {
  const found = await page.evaluate((t) => {
    const all = Array.from(document.querySelectorAll('h2')).filter(e => e.textContent.trim() === t);
    if (all.length === 0) return false;
    const el = all[all.length - 1];
    const btn = el.closest('.MuiCardActionArea-root') || el.closest('[role="button"]') || el.closest('button');
    if (btn) { btn.click(); return true; }
    return false;
  }, title);
  if (!found) console.log(`  !! h2 (last) not found: "${title}"`);
  return found;
}

async function clickH5(page, title) {
  const found = await page.evaluate((t) => {
    const el = Array.from(document.querySelectorAll('h5')).find(e => e.textContent.trim() === t);
    if (!el) return false;
    const clickable = el.closest('[style*="cursor: pointer"]') || el.closest('[role="button"]') || el.closest('button') || el.parentElement;
    if (clickable) { clickable.click(); return true; }
    el.click();
    return true;
  }, title);
  if (!found) console.log(`  !! h5 not found: "${title}"`);
  return found;
}

async function hasVideoModal(page) {
  return page.evaluate(() => {
    return !!(
      document.querySelector('[class*="jwplayer"]') ||
      document.querySelector('[class*="MuiDialog"]') ||
      document.querySelector('video') ||
      document.querySelector('[class*="ReactModal"]') ||
      document.querySelector('[class*="modal"]')
    );
  });
}

async function getH2s(page) {
  return page.evaluate(() => Array.from(document.querySelectorAll('h2')).map(e => e.textContent.trim()));
}

async function getH5s(page) {
  return page.evaluate(() => Array.from(document.querySelectorAll('h5')).map(e => e.textContent.trim()).filter(t => t && !t.includes('ElDaour') && !t.includes('Hi ')));
}

async function hasSpinner(page) {
  return page.evaluate(() => !!document.querySelector('.MuiCircularProgress-root'));
}

// Navigate to course-library fresh each major test
async function gotoLibrary(page) {
  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
}

const results = [];
function report(test, pass, detail = '') {
  const icon = pass ? PASS : FAIL;
  console.log(`  ${icon} ${test}${detail ? ' — ' + detail : ''}`);
  results.push({ test, pass });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 900 },
  });
  const page = await browser.newPage();
  page.on('pageerror', () => {});  // suppress noise

  // ── Login ──────────────────────────────────────────────────────────────────
  console.log('\n── Login ──');
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(1000);
  await page.type('input[type="email"]', EMAIL);
  await page.type('input[type="password"]', PASSWORD);
  await page.keyboard.press('Enter');
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
  await sleep(2000);
  const loggedIn = page.url().includes('gymnasticbodies.com') && !page.url().includes('/login');
  report('Login succeeds', loggedIn, page.url());

  // ── First-row cards visible ────────────────────────────────────────────────
  console.log('\n── Course Library top-level cards ──');
  await gotoLibrary(page);
  const h2s = await getH2s(page);
  const expectedCards = ['Foundation','Handstand','Stretch','Movement','Rings','Restore','Fundamentals','Elements','Thrive','Classes'];
  for (const card of expectedCards) {
    report(`Card: ${card}`, h2s.includes(card));
  }

  // ── Foundation Intro: full drill-down + video click ────────────────────────
  console.log('\n── Foundation Intro (deep) ──');
  await gotoLibrary(page);
  await clickH2(page, 'Foundation');
  await sleep(1500);
  await clickH2(page, 'Foundation Intro');
  await sleep(5000);
  const spinnerFI = await hasSpinner(page);
  report('Foundation Intro: no spinner', !spinnerFI);
  const h2sFI = await getH2s(page);
  const fiGroups = h2sFI.filter(h => h.includes('Introduction') || h.includes('Walkthrough') || h.includes('Front Lever'));
  report('Foundation Intro: exercise groups shown', fiGroups.length >= 7, `${fiGroups.length} groups`);
  // Click into first group card
  if (fiGroups.length > 0) {
    await clickH2(page, fiGroups[0]);
    await sleep(1500);
    const h5sFI = await getH5s(page);
    report('Foundation Intro: playlist items shown after group click', h5sFI.length >= 1, h5sFI[0] || 'none');
    // Click the playlist item (video)
    if (h5sFI.length > 0) {
      await clickH5(page, h5sFI[0]);
      await sleep(3000);
      const modal = await hasVideoModal(page);
      report('Foundation Intro: video modal opens', modal);
    }
  }

  // ── Restore: Ankle & Knee — full drill-down + video click ──────────────────
  console.log('\n── Ankle & Knee Restore (deep) ──');
  await gotoLibrary(page);
  await clickH2(page, 'Restore');
  await sleep(1500);
  const h2sRestore = await getH2s(page);
  report('Restore: 7 sub-courses shown', h2sRestore.filter(h => h.includes('Restore')).length >= 7,
    h2sRestore.filter(h => h.includes('Restore')).length + ' found');
  await clickH2(page, 'Ankle & Knee Restore');
  await sleep(5000);
  const spinnerAK = await hasSpinner(page);
  report('Ankle & Knee Restore: no spinner', !spinnerAK);
  const h2sAK = await getH2s(page);
  // Group cards start after 10 first-row + 7 sub-course h2s = index 17
  const akFirstGroupIdx = 10 + 7;
  const akFirstGroupTitle = await clickH2AtIndex(page, akFirstGroupIdx);
  report('Ankle & Knee Restore: exercise group card shown', !!akFirstGroupTitle, akFirstGroupTitle || 'none');
  console.log(`  clicked group card h2[${akFirstGroupIdx}]: "${akFirstGroupTitle}"`);
  await sleep(1500);
  const h5sAK = await getH5s(page);
  report('Ankle & Knee Restore: playlist item shown', h5sAK.length >= 1, h5sAK[0] || '0 items');
  if (h5sAK.length > 0) {
    await clickH5(page, h5sAK[0]);
    await sleep(3000);
    const modal = await hasVideoModal(page);
    report('Ankle & Knee Restore: video modal opens', modal);
  }

  // ── Fundamentals Day 1: full drill-down + video click ─────────────────────
  console.log('\n── Fundamentals Day 1 (deep) ──');
  await gotoLibrary(page);
  await clickH2(page, 'Fundamentals');
  await sleep(1500);
  const h2sFund = await getH2s(page);
  report('Fundamentals: sub-courses shown', h2sFund.filter(h => h.startsWith('Fundamentals Day')).length >= 10,
    h2sFund.filter(h => h.startsWith('Fundamentals Day')).length + '/20');
  await clickH2(page, 'Fundamentals Day 1');
  await sleep(5000);
  const spinnerFund = await hasSpinner(page);
  report('Fundamentals Day 1: no spinner', !spinnerFund);
  const h2sFundAfter = await getH2s(page);
  // Group cards start after 10 first-row + 20 sub-course h2s = index 30
  const fundFirstGroupIdx = 10 + 20;
  const fundFirstGroupTitle = await clickH2AtIndex(page, fundFirstGroupIdx);
  report('Fundamentals Day 1: group card shown', !!fundFirstGroupTitle, fundFirstGroupTitle || 'none');
  console.log(`  clicked group card h2[${fundFirstGroupIdx}]: "${fundFirstGroupTitle}"`);
  await sleep(1500);
  const h5sFund = await getH5s(page);
  report('Fundamentals Day 1: playlist item shown', h5sFund.length >= 1, h5sFund[0] || '0 items');
  if (h5sFund.length > 0) {
    await clickH5(page, h5sFund[0]);
    await sleep(3000);
    const modal = await hasVideoModal(page);
    report('Fundamentals Day 1: video modal opens', modal);
  }

  // ── Elements 1: full drill-down + video click ──────────────────────────────
  console.log('\n── Elements 1 (deep) ──');
  await gotoLibrary(page);
  await clickH2(page, 'Elements');
  await sleep(1500);
  await clickH2(page, 'Elements 1');
  await sleep(5000);
  const spinnerE1 = await hasSpinner(page);
  report('Elements 1: no spinner', !spinnerE1);
  const h2sE1 = await getH2s(page);
  // Group cards start after 10 first-row + 2 sub-course h2s = index 12
  const e1FirstGroupIdx = 10 + 2;
  const e1FirstGroupTitle = await clickH2AtIndex(page, e1FirstGroupIdx);
  report('Elements 1: group card shown', !!e1FirstGroupTitle, e1FirstGroupTitle || 'none');
  console.log(`  clicked group card h2[${e1FirstGroupIdx}]: "${e1FirstGroupTitle}"`);
  await sleep(1500);
  const h5sE1 = await getH5s(page);
  report('Elements 1: playlist item shown', h5sE1.length >= 1, h5sE1[0] || '0 items');
  if (h5sE1.length > 0) {
    await clickH5(page, h5sE1[0]);
    await sleep(3000);
    const modal = await hasVideoModal(page);
    report('Elements 1: video modal opens', modal);
  }

  // ── Thrive: opens drawer ───────────────────────────────────────────────────
  console.log('\n── Thrive ──');
  await gotoLibrary(page);
  await clickH2(page, 'Thrive');
  await sleep(2000);
  const thriveDrawer = await page.evaluate(() => !!document.querySelector('.MuiDrawer-root'));
  report('Thrive: drawer opens', thriveDrawer);

  // ── Classes: routes to /class-finder ──────────────────────────────────────
  console.log('\n── Classes ──');
  await gotoLibrary(page);
  await clickH2(page, 'Classes');
  await sleep(3000);
  report('Classes: routes to /class-finder', page.url().includes('/class-finder'), page.url());

  // ── Regression: Handstand 1 (ProgressionRows) — existing course ────────────
  console.log('\n── Regression: Handstand 1 (existing ProgressionRows) ──');
  await gotoLibrary(page);
  await clickH2(page, 'Handstand');
  await sleep(1500);
  await clickH2(page, 'Handstand 1');
  await sleep(5000);
  const spinnerHS = await hasSpinner(page);
  report('Handstand 1: no spinner', !spinnerHS);
  const h2sHS = await getH2s(page);
  const hsGroups = h2sHS.filter(h => !['Foundation','Handstand','Stretch','Movement','Rings','Restore','Fundamentals','Elements','Thrive','Classes','Handstand 1','Handstand 2','Handstand 3'].includes(h));
  report('Handstand 1: exercise groups shown (ProgressionRows)', hsGroups.length > 0, `${hsGroups.length} groups: ${hsGroups.slice(0,3).join(', ')}`);

  // ── Summary ────────────────────────────────────────────────────────────────
  console.log('\n══ SUMMARY ══');
  const passed = results.filter(r => r.pass).length;
  const failed = results.filter(r => !r.pass).length;
  console.log(`${passed} passed, ${failed} failed`);
  if (failed > 0) {
    console.log('Failed:');
    results.filter(r => !r.pass).forEach(r => console.log(`  ${FAIL} ${r.test}`));
  }

  await browser.close();
})();
