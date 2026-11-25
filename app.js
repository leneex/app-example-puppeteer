import http from 'node:http';
import puppeteer from 'puppeteer';

// The platform passes the port in the PORT variable; 3000 by default
const port = Number(process.env.PORT) || 3000;
const url = 'https://en.wikipedia.org/wiki/%22Hello,_World!%22_program';

// Opens the article in headless Chrome and returns its first paragraph
async function helloWorld() {
  // In the container the app runs as root, and as root Chrome starts only without the sandbox
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  try {
    const page = await browser.newPage();
    await page.goto(url);

    return await page.$eval('#mw-content-text p', (el) => el.innerText);
  } finally {
    await browser.close();
  }
}

const server = http.createServer(async (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('ok\n');
    return;
  }

  if (req.url !== '/') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found\n');
    return;
  }

  try {
    const text = await helloWorld();
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(text + '\n');
  } catch (err) {
    console.error(err);
    res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Could not open the page\n');
  }
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
