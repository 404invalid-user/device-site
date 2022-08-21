const { Schema, model } = require('mongoose');

var str = { type: String, requred: true, default: 'none' };

const scanSchema = new Schema({
    id: str,
    date: str,
    ip: str,
    location: str,
    browser: str,
    os: str,
    inLostMode: {
        type: Boolean,
        required: true,
        default: false
    }
}, { versionKey: false });

module.exports = model('scan', scanSchema);