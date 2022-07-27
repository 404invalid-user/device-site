require('dotenv').config();
const express = require('express');
const app = express();
const { port } = require('./conf');


app.use(express.static(__dirname + '/www/static'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/www/views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    const { headers: { cookie } } = req;
    if (cookie) {
        const values = cookie.split(';').reduce((res, item) => {
            const data = item.trim().split('=');
            return {...res, [data[0]]: data[1] };
        }, {});
        req.cookies = values;
    } else req.cookies = {};
    next();
});

app.get('/', (req, res) => res.send('devices'));

app.get('/new', (req, res) => res.send());
app.get('/:id', require('./get/device'));

app.post('/new', (req, res) => res.send());

app.listen(port, () => {
    console.log("Ready!");
    console.log("app listening on 0.0.0.0:" + port);
});