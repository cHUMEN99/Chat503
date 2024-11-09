const http = require('http');

// Створення сервера
let server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!\n');
});

const PORT = 3001;
const HOST = 'localhost';

// Прослуховування сервера на порту та IP-адресі
server.listen(PORT, HOST, () => {
    console.log(`Сервер запущено на http://${HOST}:${PORT}`);
});
