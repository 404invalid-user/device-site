const { Schema, model } = require('mongoose');

const deviceSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: false },
    realImage: { type: String, required: false },
    state: { type: String, default: '' },
    images: { type: Array, required: true, default: [] },
    forSale: { type: String, required: true, default: "No" },
    saleLink: { type: Boolean, required: false },
    lostMode: { type: Boolean, required:true, default: false },
}, { versionKey: false })

module.exports = model('device', deviceSchema);