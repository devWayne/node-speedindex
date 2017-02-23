const Metric = require('./lib/metric'),
    Utils = require('./lib/utils'),
    spawn = require('child_process').spawn,
    Map = require('promise.map'),
    oss = require('./lib/oss'),
    fse = require('fs-extra');

var ls;

function memReset() {
    var flag = false;
    return new Promise((resolve, reject) => {
        ls = spawn('./reset.sh', []);
        ls.stdout.on('data', function(data) {
            console.log('data: ' + data);
            flag = true;
            if (!false)
                setTimeout(function() {
                    resolve();
                }, 5000)
        });
        ls.stdout.on('end', function(data) {
            console.log('end: ' + data);
        });
    })
}

function resultReset(outputFilePath) {
    outputFilePath = outputFilePath || './test.json';
    fse.writeJsonSync(outputFilePath, []);
    return oss.setFile('result.json', 'test.json')
}

function workflow(intputFileName, outputFileName) {
    intputFileName = intputFileName || 'index.json';
    outputFileName = outputFileName || 'result.json';
    var outputFilePath = './test.json';
    return resultReset()
        .then(res => {
            return memReset()
        })
        .then(res => {
            return oss.getFile(intputFileName)

        })
        .then(res => {
            return Map(res.urlList, (item, index) => {
                return Metric.metric(item)
                    .then(result => {
                        return oss.getFile(outputFileName)
                            .then(ossResult => {
                                ossResult.push(result);
                                fse.writeJsonSync(outputFilePath, ossResult);
                                return oss.setFile(outputFileName, outputFilePath);

                            })
                    })
                    .then(res => {
                        console.log('oss分批写入完毕，目前进度: ' + index);
                        return memReset();
                    })
            }, 1);
        })
        .then(res => {
            return memReset()
        })
        .catch(e => {
            console.log('workflow: ' + e)
        })

}



exports.workflow = workflow;

/*
function metricListPathFile(intputFileName, outputFilePath) {
    var result = {};

    var outputFilePath = outputFilePath || './test.json'
    return oss.getFile(intputFileName)
        .then(res => {
            var urlList = res.urlList;
            console.log('urlList' + res.urlList);
            return Map(urlList, (url, index) => {
                return metric(url)
                    .then(res => {
                        result[res.url] = res.run;
                        console.log(new Date() + '完成' + res.url + '的计算');
                    })
            }, 1).then(res => {
                fse.writeJsonSync(outputFilePath, result);
                Mail.send({
                    from: cfg.from, // sender address
                    to: cfg.to,
                    cc: cfg.to, // list of receivers
                    subject: 'SpeedIndex作业', // Subject line
                    text: 'SpeedIndex作业', // plaintext body
                    html: result
                });
                return oss.setFile('result.json', outputFilePath);
            })
        }).catch(e => {
            console.log('metricListPathFile e: ' + e);
        });
}*/
