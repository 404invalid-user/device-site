const fs = require('fs')
const mongoose = require('mongoose');
const geoip = require('geoip-lite');

const DeviceSchema = require('./database/device');
const scanSchema = require('./database/scan');

//cache for devices
let devices = [];

module.exports.connect = async() => {
    await mongoose.connect(process.env.DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to database!');
    }).catch((err) => console.log(err.stack || err));
    await DeviceSchema.find({}).then((result) => {
        result.forEach((d) => devices.push(d));
    }).catch((err) => console.log(err.stack || err));
    return;
}



module.exports.getDevice = async(id) => {
    let device = devices.filter(d => d.id === id)[0];
    if (device == null || device == undefined) {
        const deviceLookup = await DeviceSchema.findOne({id: id});
        if (deviceLookup == null) return null;
        deviceLookup.save = undefined;
        devices.push(deviceLookup);
        device = devices.filter(d => d.id === id)[0];
    }
    return device;
}



module.exports.updateDevicesCache = async() => {
    devices = [];
    await DeviceSchema.find({}).then((result) => {
        result.forEach((d) => devices.push(d));
    });
    return;
}

module.exports.addDeviceView = async(req, deviceid,inLostMode) => {
    let ref = req.query.ref;
    if (!req.query.ref) {
        ref = req.query.r;
    }

    let ip = req.ip.replace('::ffff:','').split(':')[0];
    let geo = await geoip.lookup(ip);

    console.log(req.ip)
    let location = "error could not get, unknown";
    try {
        location =geo ? geo.region : "unknown" + ", " + geo ? geo.country : "unknown";
    } catch (err) {
        console.log(err);
    } 

    const data = {
        id: deviceid,
        date: Date.now().toString(),
        ip: ip,
        location: location,
        browser: req.useragent.browser,
        os: req.useragent.os,
        inLostMode:inLostMode
    }
    scanSchema.create(data);
}