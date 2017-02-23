const path = require('path'),
    fs = require('fs');

module.exports = {

    getFileStream: function(srcFile) {
        var filePath = path.join(process.cwd(), srcFile);
        //console.log(filePath);
        return fs.createReadStream(filePath);
    },

    urlSplit: function(urlList,num) {
        num = num || 10;
        var result = [];
        for (var i = 0, len = urlList.length; i < len; i += num) {
            result.push(urlList.slice(i, i + num));
        }
        return result;
    }
}
