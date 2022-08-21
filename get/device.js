const conf = require('../conf');
const { getDevice,addDeviceView } = require('../database');
module.exports = async(req, res) => {
    const device = await getDevice(req.params.id);

    if (device == null) return res.send("404 - that device cant be found");
    addDeviceView(req, device.id, device.lostMode);

    return res.render('device', { device: device, conf });
}