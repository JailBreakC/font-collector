var collector = require('./collector');
var fontCarrier = require('font-carrier');

var output = function(param) {

	var checkParam = function() {
		if(!param.sourcePath) return 'sourcePath error: 请填写源文件路径';
		if(!param.fontPath) return 'fontPath error: 请填写字体路径';
		if(!param.outputPath) return 'outputPath error: 请填写输出路径';
		return false;
	}
	var err = checkParam();
	if(err) {
		console.error(err);
	}

	var str = collector(param.sourcePath);

	var transFont = fontCarrier.transfer(param.fontPath);
	var font = fontCarrier.create();

	var gs = transFont.getGlyph(str)

	console.log('以下字符转换提取成功:\r\n ------ ');
	console.log(str);

	//设置到空白字体里面
	font.setGlyph(gs);

	font.output({
		path: param.outputPath
	})
}

exports.output = output