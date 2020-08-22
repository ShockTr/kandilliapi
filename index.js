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
        return document.getElementsByTagName("pre").item(0).innerText;
    });
    let text = src.replace(delete1, '');
    text = text.split('\n');
    let depremler = [];
    for(let i = 0; 498 > i; i++){
        depremler[i] = {
            "Tarih" : text[i].slice(0, 10).trim(),
            "Saat" : text[i].slice(11, 19).trim(),
            "Enlem" : text[i].slice(21, 28).trim(),
            "Boylam" : text[i].slice(31, 38).trim(),
            "Derinlik" : text[i].slice(46, 50).trim(),
            "MD" : text[i].slice(55, 59).trim(),
            "ML" : text[i].slice(60, 64).trim(),
            "MW" : text[i].slice(65, 69).trim(),
            "Yer" : text[i].slice(71, 121).trim(),
            "Niteligi" : text[i].slice(121, ),
        }
    }
    await browser.close()
    return depremler
}
app.get('/', (req, res) => {
    fetchDeprem().then(data => {
        res.json({
            "depremler" : data
        })
    })
});
const port =  process.env.PORT  || 3000;
const listener = app.listen(port , (err) => {
    if (err) throw err;
    console.log(`API ${listener.address().port} portunda hazır!`);
});
