const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox']});
  const p = await b.newPage();
  await p.goto('file:///home/claude/cv/cv.html', {waitUntil:'networkidle'});
  await p.waitForTimeout(400);
  await p.pdf({path:'praise-taiwo-cv.pdf', format:'A4', printBackground:true, preferCSSPageSize:true});
  // also a PNG preview of the page
  await p.setViewportSize({width:1000,height:1414});
  await p.screenshot({path:'cv-preview.png', fullPage:true});
  await b.close();
})();
