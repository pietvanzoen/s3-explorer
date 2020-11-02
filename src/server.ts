import { createServer, IncomingMessage, ServerResponse } from 'http';
import { join } from 'path';
import ejs from 'ejs';
import { readFileSync } from 'fs';
import list from './list-files';

const template = ejs.compile(readFileSync(__dirname + '/view.ejs', 'utf8'));

const { PORT = 8080, BUCKET = '', PREFIX = '' } = process.env;

const server = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    const path = join(PREFIX, req.url || '', '/');
    const files = await list(BUCKET, path);
    console.log(files);
    if (files === null) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write('Not found');
      res.end();
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(template({ prefix: PREFIX, files, title: join(BUCKET, path) }));
    res.end();
  },
);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
