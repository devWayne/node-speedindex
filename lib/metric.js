const PWMetrics = require('pwmetrics');
const Map = require('promise.map');
const fse = require('fs-extra');
const path = require('path');
const oss = require('./oss');
const Utils = require('./utils');
const Mail = require('./mail');
const cfg = require('../config').mail
const pwMetrics = new PWMetrics('', {
    json: true,
    run: 1
});


function metric(url) {
    pwMetrics.url = url;
    return pwMetrics.start().then(res => {
        let run = res.runs[0],
            _url = run.initialUrl;
        return {
            url: _url,
            run: run
        };
    }).catch(e => {
        console.log('metric e: ' + e);
    })
}


function metricList(urlList) {
    var result = {};
    return Map(urlList, (url, index) => {
        return metric(url)
            .then(res => {
                result[res.url] = res.run;
                console.log(new Date() + '完成' + res.url + '的计算');
            })
    }, 1).then(res => {
        return result;
    })
}


module.exports = {
    metric: metric,
    metricList: metricList
}
