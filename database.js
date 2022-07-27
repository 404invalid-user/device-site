const fs = require('fs')
module.exports.getDevice = (id) => {
    const devices = JSON.parse(fs.readFileSync('database.json', 'utf8'));
    const device = devices.filter(d => d.id == id)[0];
    if (device == null || device == undefined) return null;

    // a way to save changes to the database
    device['save'] = () => {

        return;
    }
    return device;
}




module.exports.addMisingDeviceScan = (data) => {

}