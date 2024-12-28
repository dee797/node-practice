// A different example of how to use express w/ routers, controllers, middleware, etc.

require('dotenv').config();
const fs = require("node:fs/promises")
const express = require("express");
const app = express();
const authorRouter = require("./routes/authorRouter");


const readFile = async (html) => {
  try {
    const data = await fs.readFile(html, { encoding: 'utf8'});
    return data;
  } catch (err) {
    console.error(err);
  }
}




app.use("/authors", authorRouter);

app.get('/', (req, res) => {
    const html = readFile('./html/index.html');
    html
        .then((data) => {
        res.status(200).send(data);
        })
        .catch((error) => console.log(error));
});

app.use((err, req, res, next) => {
    console.error(err);
    // We can now specify the `err.statusCode` that exists in our custom error class and if it does not exist it's probably an internal server error
    res.status(err.statusCode || 500).send(err.message);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT);
