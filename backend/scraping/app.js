const puppeteer = require('puppeteer');

async function newestAnime() {
    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
    });
    const page = await browser.newPage();
    await page.goto('https://otakudesu.cloud/', { timeout: 0 });



    const allItem = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.detpost'));
        const data = items.map(item => ({
            title: item.querySelector('h2').innerText,
            episode: item.querySelector('.epz').innerText.replace(' ', ''),
            image: item.querySelector('img').src,
            link: item.querySelector('a').href,
            date: item.querySelector('.newnime').innerText + ',' + item.querySelector('.epztipe').textContent
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
    await page.goto(`https://otakudesu.cloud/?s=${keyword}&post_type=anime`, { timeout: 0 });

    const allItem = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.chivsrc li'));
        const data = items.map(item => ({
            title: item.querySelector('h2 a').innerText,
            image: item.querySelector('img').src,
            link: item.querySelector('h2 a').href,
            genre: item.children[2].textContent.replace('Genres : ', ''),
            status: item.children[3].textContent.replace("Status : ", ""),
            rating: item.children[4].textContent.replace("Rating : ", ""),
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
    await page.goto(`https://otakudesu.cloud/anime/${keyword}`, { timeout: 0 });

    const allItem = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.episodelist ul li'));
        const data = items.map(item => ({
            title: item.querySelector('span a').textContent,
            link: item.querySelector('span a').href,
        }));
        return data
    });


    browser.close()
    return allItem
}

const watchAnime = async (keyword) => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(`https://otakudesu.cloud/episode/${keyword}`, { timeout: 0 });

    // select the 720p resolution
    // await page.click('ul.m480p')
    // await page.click('.m480p > li:nth-child(2) > a:nth-child(1)')

    const allItem = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.responsive-embed-stream'));
        const data = items.map(item => ({
            link: item.querySelector('iframe').src,
        }));
        return data
    });


    browser.close()
    return allItem
}

module.exports = { newestAnime, searchAnime, detailAnime, watchAnime }

