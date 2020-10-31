import { createServer, ServerResponse } from 'http';

const { PORT = 8080 } = process.env;

const server = createServer((_, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('Hello World');
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
