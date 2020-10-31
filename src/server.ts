import { createServer, IncomingMessage, ServerResponse } from 'http';
import ejs from 'ejs';
import { readFileSync } from 'fs';
import list from './list-files';

const template = ejs.compile(readFileSync(__dirname + '/view.ejs', 'utf8'));

const { PORT = 8080 } = process.env;

const server = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url !== '/') {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write('Not Found');
      res.end();
      return;
    }
    const files = await list(process.env.BUCKET, process.env.PREFIX);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(template({ files, bucket: process.env.BUCKET }));
    res.end();
  },
);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
