const puppeteer = require('puppeteer');

const link = "https://gojonime.com/"

async function newestAnime() {
    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
    });
    const page = await browser.newPage();
    // await page.goto('https://otakudesu.cloud/', { timeout: 0 });
    await page.goto(link, { timeout: 0 });



    const allItem = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.bsx'));
        const data = items.map(item => ({
            title: item.querySelector('a div.tt').textContent,
            image: item.querySelector('a div.limit img').src,
            link: item.querySelector('a').href,
        }));
        return data
    });


    browser.close()
    return allItem
}

const searchAnime = async (keyword) => {
    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
    });

    const page = await browser.newPage();
    await page.goto(`${link}?s=${keyword}`, { timeout: 0 });

    const allItem = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.bsx'));
        const data = items.map(item => ({
            title: item.querySelector('a div.tt').textContent,
            image: item.querySelector('a div.limit img').src,
            link: item.querySelector('a').href,
            status: item.querySelector('a div.limit div.bt span').textContent,
        }));
        return data
    });


    browser.close()
    return allItem
}

const detailAnime = async (keyword) => {
    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
    });

    const page = await browser.newPage();
    await page.goto(`${link}anime/${keyword}`, { timeout: 0 });

    const allItem = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.eplister ul li'));
        const data = items.map(item => ({
            title: item.querySelector('a .epl-title').textContent,
            link: item.querySelector('a').href,
            date: item.querySelector('a .epl-date').textContent,
        }));
        return data
    });


    browser.close()
    return allItem
}

const watchAnime = async (keyword) => {
    const browser = await puppeteer.launch(
        {
            devtools: true,
            headless: false,
            slowMo: 200,
        }
    );

    const page = await browser.newPage();
    await page.goto(`${link}episode/${keyword}`, { timeout: 0 });

    // select the 720p resolution
    // await page.click('.mirror')
    // await page.click('.mirror > option:nth-child(4)')

    const allItem = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.player-embed'));
        const data = items.map(item => ({
            link: item.querySelector('iframe').src,
        }));
        return data
    });


    browser.close()
    return allItem
}

module.exports = { newestAnime, searchAnime, detailAnime, watchAnime }

