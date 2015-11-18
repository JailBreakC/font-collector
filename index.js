var fontCarrier = require('font-carrier');
var collector = require('./lib/collector');
var font = require('./lib/font');

font.output({
	sourcePath: './test/index.html',
	fontPath: 'test/lib/handfont.ttf',
	outputPath: './test/handfont'
});

//这里有一大片的中文文文文


module.exports = collector