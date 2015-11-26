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

var _p2files = function(patternArr) {
    // 合并pattern 数组为一条pattern
    var pattern = '{'+ patternArr.join(',') + '}';

    console.log(pattern);
    var files = glob.sync(pattern);
    console.log(files)   
    return files
}

var _getFiles = function(paths) {
    if(_.isArray(paths)) {
        var pattern = '{'+ paths.join(',') + '}';
        return glob.sync(pattern, {nodir: true, matchBase: true}); 
    }
    if(_.isString(paths)) {
        return glob.sync(paths, {nodir: true, matchBase: true});
    }
    throw new Error('paths or ignores should be a string or array');
}

var getAllText = function(param) {

    var text = '';

    var globParam = {
        nodir: true, 
        matchBase: true
    };

    if( _.isString(param.source) ) {

        var files = glob.sync(param.source, globParam); 

        files.forEach(function(file) {
            text += readText(file, param.encrypt);
        })

    } else if(_.isObject(param.source)) {

        globParam.ignore = param.source.ignore; 

        var files = glob.sync(param.source.path, globParam); 

        files.forEach(function(file) {
            text += readText(file, param.encrypt);
        })
        console.log(files);
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

