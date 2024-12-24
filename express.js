// This is just index.js rewritten in Express (index.js uses node)

require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('node:fs/promises');


const readFile = async (html) => {
  try {
    const data = await fs.readFile(html, { encoding: 'utf8'});
    return data;
  } catch (err) {
    console.error(err);
  }
}


app.get('/about', (req, res) => {
    const html = readFile('./html/about.html');
    html
        .then((data) => {
        res.status(200).send(data);
        })
        .catch((error) => console.log(error));
});


app.get('/contact', (req, res) => {
    const html = readFile('./html/contact.html');
    html
        .then((data) => {
        res.status(200).send(data);
        })
        .catch((error) => console.log(error));
});


app.get('/', (req, res) => {
    const html = readFile('./html/index.html');
    html
        .then((data) => {
        res.status(200).send(data);
        })
        .catch((error) => console.log(error));
});


app.use((req, res, next) => {
    res.status(404);

    const html = readFile('./html/404.html');
    html
        .then((data) => {
        res.send(data);
        })
        .catch((error) => {
            console.log(error)
            res.send("404 - Not Found");
        });
});


const PORT = process.env.PORT || 3000

app.listen(PORT);