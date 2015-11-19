var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var iconv = require('iconv-lite');
var _ = require('lodash');

var readText = function (pathname, encrypt) {

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

var getAllText = function(dir, encrypt) {

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

    travel(dir, encrypt);

    return text;
}


var collector = function (pathname, encrypt) {

    encrypt = encrypt || 'utf-8';

    var text = getAllText(pathname, encrypt);

    var textArray = text.match(/[\u4e00-\u9fa5]/g);

    text = _.uniq(textArray).join('');

    return text;
}


module.exports = collector;

