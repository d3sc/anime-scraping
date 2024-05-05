const express = require('express');
const cors = require('cors');
const { newestAnime, searchAnime, detailAnime, watchAnime } = require('./scraping/app.js');
const app = express();
const port = 3000;

// const corsOptions = {
//     origin: 'http://localhost:5173', // Izinkan hanya request dari domain ini
//     methods: 'GET,POST', // Izinkan hanya metode GET dan POST
//     allowedHeaders: 'Content-Type,Authorization', // Izinkan hanya header ini
//     optionsSuccessStatus: 200 // Beberapa browser lama memerlukan ini
// };

app.use(cors({
    credentials: true,
    origin: "*",
}));

app.get('/newest', async (req, res) => {
    return res.send(await newestAnime());
});
app.get('/search/:name', async (req, res) => {
    const name = req.params.name
    return res.json(await searchAnime(name));
});
app.get('/anime/:name', async (req, res) => {
    const name = req.params.name
    return res.json(await detailAnime(name));
});
app.get('/episode/:name', async (req, res) => {
    const name = req.params.name
    return res.json(await watchAnime(name));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// startPuppetter().then(res => console.log(res))
