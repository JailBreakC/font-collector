var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var iconv = require('iconv-lite');
var _ = require('lodash');
var glob = require('glob');

var readText = function (pathname, encrypt) {

    encrypt = encrypt || 'utf-8';

    encrypt = encrypt.toLowerCase()

    function _readText(pathname) {
        var bin = fs.readFileSync(pathname);

        if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
            bin = bin.slice(3);
        }

        return bin.toString('utf-8');
    }

    function _readGBKText(pathname) {
        var bin = fs.readFileSync(pathname);

        return iconv.decode(bin, 'gbk');
    }

    if(encrypt === 'gbk') {
        return _readGBKText(pathname);
    }

    return _readText(pathname);
}

var getAllText = function(param) {

    var text = '';

    var travel = function (dir, encrypt) {

        if(!fs.statSync(dir).isDirectory()) {
            text += readText(dir, encrypt);
        } else {
            fs.readdirSync(dir).forEach(function (file) {

                var pathname = path.join(dir, file);

                if (fs.statSync(pathname).isDirectory()) {
                    travel(pathname, encrypt);
                } else {
                    text += readText(pathname, encrypt);
                }
            });
        }
    }
    if( _.isString(param.source) ) {
        travel(param.source, param.encrypt);
    } else {
        //travel(param.source, param.encrypt);
        console.log(param.source.ignore[0]);
        var files = glob.sync(param.source.ignore[0]);
        console.log(files)
    }
    return text;
}


var collector = function (param) {

    var text = getAllText(param);

    var textArray = text.match(/[\u4e00-\u9fa5]/g);

    text = _.uniq(textArray).join('');

    return text;
}

collector.readText = readText;

module.exports = collector;

