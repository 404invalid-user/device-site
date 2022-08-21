require('dotenv').config();
const express = require('express');
const app = express();
const { port } = require('./conf');
const useragent = require('express-useragent');

const db = require('./database');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(useragent.express());
app.set('trust proxy', true);
app.use(express.static(__dirname + '/www/static'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/www/views');
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


app.get('/', require('./get/index'));

app.get('/new', (req, res) => res.send());
app.get('/update-devices', require('./get/update-devices'));
app.get('/:id', require('./get/device'));

app.post('/new', (req, res) => res.send());


async function main() {
    await db.connect()
    app.listen(port, () => {
        console.log("Ready!");
        console.log("app listening on 0.0.0.0:" + port)
    });
}
main()