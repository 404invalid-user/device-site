const conf = require('../conf');
const { getDevice } = require('../database');
module.exports = async(req, res) => {
    const device = await getDevice(req.params.id);

    if (device == null) return res.send("404 - that device cant be found");

    res.render('device', { device: device, conf });
}