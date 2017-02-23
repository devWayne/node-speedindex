var OSS = require('ali-oss').Wrapper,
    config = require('../config').oss,
    Utils = require('./utils');



var client = OSS(config);


module.exports = {
    setFile: function(name,path) {
        return client.putStream(name, Utils.getFileStream(path)).then(function(val) {
            console.log('result: %j', val);
        }).catch(function(err) {
            console.log('error: %j', err);
        });
    },

    getFile: function(name) {
        return client.get(name).then(function(val) {
            console.log('result: %j', val.res.data.toString());
            return JSON.parse(val.res.data);
        }).catch(function(err) {
            console.log('error: %j', err);
            return [];
        });
    }
}
