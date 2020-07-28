const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const fs = require('fs');

let config = fs.readFileSync('config.json');
let delete1 = JSON.parse(config).delete;
async function fetchDeprem(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://www.koeri.boun.edu.tr/scripts/lst0.asp");

    const src = await page.evaluate(() => {
        let srctext = document.getElementsByTagName("pre").item(0).innerText
        return srctext;

    });
    let text = src.replace(delete1, '');
    text = text.split('\n');
    let depremler = [];
    for(let i = 0; 498 > i; i++){
        depremler[i] = {
            "Tarih" : text[i].slice(0, 10),
            "Saat" : text[i].slice(11, 19),
            "Enlem" : text[i].slice(21, 28),
            "Boylam" : text[i].slice(31, 38),
            "Derinlik" : text[i].slice(46, 50),
            "MD" : text[i].slice(55, 59),
            "ML" : text[i].slice(60, 64),
            "MW" : text[i].slice(65, 69),
            "Yer" : text[i].slice(71, 121),
            "Niteligi" : text[i].slice(121, ),
        }
    }
    return depremler
};
app.get('/', (req, res) => {
    fetchDeprem().then(data => {
        res.json({
            "depremler" : data
        })
    })
});
const port =  process.env.PORT  || 443;
const listener = app.listen(port , (err) => {
    if (err) throw err;
    console.log(`API ${listener.address().port} portunda hazır!`);
});


