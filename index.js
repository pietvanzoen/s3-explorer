import http from 'http';

const { PORT = 8080 } = process.env;

const server = http.createServer(function (req: Request, res: Response) {   // 2 - creating server
    res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World');
  res.end();
});

server.listen(PORT);

console.log(`Listening on port ${PORT}`)
