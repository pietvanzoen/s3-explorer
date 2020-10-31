"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const { PORT = 8080 } = process.env;
const server = http_1.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Hello World');
    res.end();
});
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
