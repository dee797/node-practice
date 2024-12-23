const http = require('http');
const fs = require('node:fs/promises');


const readFile = async (html) => {
  try {
    const data = await fs.readFile(html, { encoding: 'utf8'});
    return data;
  } catch (err) {
    console.error(err);
  }
}

const server = http.createServer();

// To test/debug, set breakpoint on line 21, open js debug terminal and enter 'node index.js', then actually go to localhost:8000 in browser to send client request. When request is sent, debugger will stop at line 21
// use req.method to get http request method (get, post, etc)
server.on('request', (req, res) => {

  const url = new URL(`http://localhost:8000${req.url}`);
  let statusCode = 200;
  let file;

  switch (url.pathname) {
    case '/':
      file = './html/index.html';
      break;
    case '/about':
      file = './html/about.html';
      break;
    case '/contact':
      file = './html/contact.html';
      break;
    default:
      file = './html/404.html';
      statusCode = 404;
  }

  const html = readFile(file);
  
  html
    .then((data) => {
      res.writeHead(statusCode, {"Content-type": 'text/html'});
      res.end(data);
    })
    .catch((error) => console.log(error));
  
});


server.listen(8000);