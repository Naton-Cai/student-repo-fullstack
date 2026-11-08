const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    '/welcome',
    '/redirect',
    '/redirected',
    '/cache',
    '/cookie',
  ];
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  // if the path name is not one of the routes return a 404 error
  if (!routes.includes(pathname)) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - page not found</h1>');
    return;
  }

  switch (pathname) {
    case '/welcome':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>Welcome!</h1>');
      break;
    case '/redirect':
      res.writeHead(302, { Location: '/redirected' });
      res.end();
      break;
    case '/redirected':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>You have been redirected!</h1>');
      break;
    case '/cache':
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Cache-Control': 'max-age=86400',
      });
      res.end('<h1>this resource was cached</h1>');
      break;
    case '/cookie':
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Set-Cookie': 'hello=world',
      });
      res.end('cookies… yummm');
      break;
    default:
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('Node Routing Exercise');
      res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
