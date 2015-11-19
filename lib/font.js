var mkdirp = require('mkdirp');
var collector = require('./collector');
var fontCarrier = require('font-carrier');

var output = function(param) {

    var checkParam = function() {
        if(!param.source) return 'source error: 请填写源文件路径';
        if(!param.font) return 'font error: 请填写字体路径';
        if(!param.output) return 'output error: 请填写输出路径';
        return false;
    }
    var err = checkParam();
    if(err) {
        console.error(err);
        return;
    }

    var str = collector(param.source);

    var transFont = fontCarrier.transfer(param.font);
    var font = fontCarrier.create();

    var gs = transFont.getGlyph(str)

    console.log('以下字符转换提取成功:\r\n ------ ');
    console.log(str);

    font.setGlyph(gs);
    var dir = param.output.slice();
    dir = dir.replace(/\\/g, '/').split('/');
    dir.pop();
    dir = dir.join('/');
    
    //设置到空白字体里面
    mkdirp(dir, function() {
        font.output({
            path: param.output
        })
    });
}

exports.output = output