const path = require('path')
const conf = require('../conf');
module.exports = (req, res) => {
    return res.render('index', {conf: conf});
}