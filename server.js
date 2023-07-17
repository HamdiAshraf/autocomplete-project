// server.js
const http = require('http');
const fs = require('fs');
const Trie = require('./trie');

const PORT = 3000;

// Read the dictionary data and build the trie
const dictionary = JSON.parse(fs.readFileSync('./dictionary.json', 'utf8'));
const trie = new Trie();
dictionary.forEach((word) => trie.insert(word.toLowerCase()));

// Create the server
const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url.startsWith('/autocomplete')) {
        const query = req.url.split('=')[1].toLowerCase();
        console.log(query)
        const suggestions = trie.search(query);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(suggestions));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
