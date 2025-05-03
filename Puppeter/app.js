const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000;

app.get('/github-user/:username', async (req, res) => {
  const username = req.params.username;
  const url = `https://github.com/${username}`;

  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const data = await page.evaluate(() => {
      const name = document.querySelector('span.p-name')?.innerText.trim() || null;
      const username = document.querySelector('span.p-nickname')?.innerText.trim() || null;
      const bio = document.querySelector('div.p-note')?.innerText.trim() || null;
      const repositories = parseInt(
        document.querySelector('a[href$="?tab=repositories"] .Counter')?.innerText.replace(',', '') || '0'
      );
      const followers = parseInt(
        document.querySelector(`a[href$="?tab=followers"] .text-bold`)?.innerText.replace(',', '') || '0'
      );
      const following = parseInt(
        document.querySelector(`a[href$="?tab=following"] .text-bold`)?.innerText.replace(',', '') || '0'
      );

      return { name, username, bio, repositories, followers, following };
    });

    // Go to repositories tab
    await page.goto(`${url}?tab=repositories`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('li[itemprop="owns"]', { timeout: 5000 }).catch(() => {});

    const repos = await page.evaluate(() => {
      const repoList = [];
      const repoNodes = document.querySelectorAll('li[itemprop="owns"]');

      repoNodes.forEach((node) => {
        const name = node.querySelector('a[itemprop="name codeRepository"]')?.innerText.trim();
        const starString = node.querySelector('a[href*="/stargazers"]')?.innerText.trim() || '0';
        const stars = parseInt(starString.replace(',', '').replace('k', '000')) || 0;

        if (name) {
          repoList.push({ name, stars });
        }
      });

      // Sort by stars descending
      repoList.sort((a, b) => b.stars - a.stars);
      return repoList.slice(0, 3);
    });

    await browser.close();

    res.json({ ...data, top_repositories: repos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch GitHub user data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
