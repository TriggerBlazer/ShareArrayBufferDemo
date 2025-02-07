const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const PORT = 8443;

const options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
};

https.createServer(options, app)
    .listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
        console.log(`https://localhost:${PORT}/`);
    });

app.use(function (req, res, next) {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
});
app.use((express.static(__dirname+ "/OffCanvas")))
app.use((express.static(__dirname+ "/Canvas")))
app.use((express.static(__dirname+ "/SharedArrayBuffer")))
app.use((express.static(__dirname+ "/DeasyncTest")))



app.get('/OffCanvas', (req, res) => {
    res.sendFile(__dirname + "/OffCanvas/index.html")
});

app.get('/Canvas', (req, res) => {
    res.sendFile(__dirname + "/Canvas/index.html")
});

app.get('/SharedArrayBuffer', (req, res) => {
    res.sendFile(__dirname + "/SharedArrayBuffer/index.html")
});

app.get('/DeasyncTest', (req, res) => {
    res.sendFile(__dirname + "/DeasyncTest/index.html")
});