import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  console.log("Navigating to app...");
  await page.goto('http://localhost:5173/#fun', { waitUntil: 'networkidle' }).catch(() => {});
  
  const title = await page.title();
  if (!title || title === 'Error') {
    await page.goto('http://localhost:3000/#fun', { waitUntil: 'networkidle' }).catch(() => {});
  }

  console.log("Clicking button...");
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent && b.textContent.includes('Grass'));
    if (btn) btn.click();
    else {
        const icons = document.querySelectorAll('.lucide-gamepad-2');
        if(icons.length > 0) icons[icons.length-1].parentElement.click();
    }
  });

  await page.waitForTimeout(3000);
  
  const html = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.mb-8'));
    const pCard = cards.find(c => c.textContent && c.textContent.includes('Wild') && !c.textContent.includes('clickCounter'));
    return pCard ? pCard.innerHTML : 'Card not found';
  });
  
  console.log("CARD HTML:", html);
  
  await browser.close();
})();
