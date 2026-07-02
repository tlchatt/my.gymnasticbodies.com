/**
 * debugCourseLibrary.js — diagnoses drill-down failures and routing
 */
const puppeteer = require('/var/www/Work/Gymfit/claudeTools/node_modules/puppeteer');

const BASE_URL = 'https://my.gymnasticbodies.com';
const EMAIL    = 'yeldaour@gmail.com';
const PASSWORD = '34216Albaqara';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function clickNative(page, title) {
  const handle = await page.evaluateHandle((t) => {
    const el = Array.from(document.querySelectorAll('h2')).find(c => c.textContent.trim() === t);
    if (!el) return null;
    return el.closest('.MuiCardActionArea-root') || el.closest('[role="button"]') || el.closest('button');
  }, title);
  const el = handle ? handle.asElement() : null;
  if (el) { await el.scrollIntoViewIfNeeded(); await el.click(); }
  else console.log(`  !! Could not find card: "${title}"`);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 900 },
  });
  const page = await browser.newPage();

  const apiCalls = [];
  page.on('response', async res => {
    const url = res.url();
    if (url.includes('course-library') || url.includes('workout-service')) {
      let body = '';
      try { body = await res.text(); } catch (e) {}
      apiCalls.push({ url, status: res.status(), body: body.substring(0, 300) });
    }
  });

  page.on('console', msg => {
    const text = msg.text();
    if (text && !text.includes('Download the React') && !text.includes('postAWS')) {
      // Only show relevant console messages
    }
  });

  const jsErrors = [];
  page.on('pageerror', e => jsErrors.push(e.message));

  // Login
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(1000);
  await page.type('input[type="email"]', EMAIL);
  await page.type('input[type="password"]', PASSWORD);
  await page.keyboard.press('Enter');
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
  await sleep(2000);
  console.log('Login URL:', page.url());

  // ─── Test 1: Foundation Intro ──────────────────────────────────────────────
  console.log('\n=== Foundation Intro drill-down ===');
  apiCalls.length = 0;

  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  await clickNative(page, 'Foundation');
  await sleep(1500);

  await clickNative(page, 'Foundation Intro');
  console.log('Foundation Intro clicked, waiting 5s...');
  await sleep(5000);

  const h2sAfter = await page.evaluate(() => Array.from(document.querySelectorAll('h2')).map(e => e.textContent.trim()));
  const hasSpinner = await page.evaluate(() => !!document.querySelector('.MuiCircularProgress-root'));
  console.log('Spinner still visible:', hasSpinner);
  console.log('H2 count:', h2sAfter.length, '— h2s:', h2sAfter.join(', '));
  // h5 = PlaylistRow items
  const h5s = await page.evaluate(() => Array.from(document.querySelectorAll('h5')).map(e => e.textContent.trim()).filter(t => t));
  console.log('Playlist items (h5):', h5s.length, '—', h5s.slice(0, 5).join(', '));
  console.log('API calls:');
  apiCalls.forEach(c => console.log(`  [${c.status}] ${c.url.split('?')[0].slice(-60)} body: ${c.body.slice(0, 80)}`));

  // ─── Test 2: Ankle & Knee Restore ─────────────────────────────────────────
  console.log('\n=== Ankle & Knee Restore drill-down ===');
  apiCalls.length = 0;

  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  await clickNative(page, 'Restore');
  await sleep(1500);
  await clickNative(page, 'Ankle & Knee Restore');
  console.log('Ankle & Knee Restore clicked, waiting 5s...');
  await sleep(5000);

  const h5sRestore = await page.evaluate(() => Array.from(document.querySelectorAll('h5')).map(e => e.textContent.trim()).filter(t => t));
  const hasSpinnerR = await page.evaluate(() => !!document.querySelector('.MuiCircularProgress-root'));
  console.log('Spinner:', hasSpinnerR, '| Playlist items:', h5sRestore.length, '—', h5sRestore.slice(0, 5).join(', '));

  // ─── Test 3: Fundamentals Day 1 ───────────────────────────────────────────
  console.log('\n=== Fundamentals Day 1 ===');
  apiCalls.length = 0;

  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  await clickNative(page, 'Fundamentals');
  await sleep(1500);
  await clickNative(page, 'Fundamentals Day 1');
  await sleep(5000);

  const h5sFund = await page.evaluate(() => Array.from(document.querySelectorAll('h5')).map(e => e.textContent.trim()).filter(t => t));
  const hasSpinnerF = await page.evaluate(() => !!document.querySelector('.MuiCircularProgress-root'));
  console.log('Spinner:', hasSpinnerF, '| Items:', h5sFund.length, '—', h5sFund.join(', '));

  // ─── Test 4: Classes routing ───────────────────────────────────────────────
  console.log('\n=== Classes routing ===');
  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  await clickNative(page, 'Classes');
  await sleep(3000);
  console.log('URL after Classes click:', page.url());
  const hasCalendar = await page.evaluate(() => !!document.querySelector('[class*="Calendar"]') || !!document.querySelector('[class*="calendar"]') || document.title.includes('Class'));
  const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 150).replace(/\n/g, ' '));
  console.log('Has calendar element:', hasCalendar);
  console.log('Page text:', bodyText);

  // ─── Test 5: Thrive drawer ─────────────────────────────────────────────────
  console.log('\n=== Thrive drawer ===');
  await page.goto(`${BASE_URL}/course-library`, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  await clickNative(page, 'Thrive');
  await sleep(2000);
  const drawerOpen = await page.evaluate(() => {
    const drawers = document.querySelectorAll('[class*="MuiDrawer"]');
    return drawers.length > 0;
  });
  console.log('Drawer opened:', drawerOpen, '| URL still:', page.url().includes('course-library'));

  if (jsErrors.length > 0) console.log('\nJS Errors:', jsErrors.slice(0, 3));

  await browser.close();
})();
