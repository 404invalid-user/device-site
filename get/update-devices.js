const conf = require('../conf');
const { updateDevicesCache } = require('../database');
const { addDeviceView } = require('../database');
module.exports = async(req, res) => {
    if(req.query.token != process.env.ADMIN_TOKEN) return res.status(401).send("401 - you cant do that");
    await updateDevicesCache();

    return res.send('done');
}