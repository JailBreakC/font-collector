var fontCarrier = require('font-carrier');
var collector = require('./lib/collector');
var font = require('./lib/font');

// font.output({
// 	source: './test/index.html',
// 	font: 'test/lib/handfont.ttf',
// 	output: './test/fonts/handfont'
// });




module.exports = {
	font: font,
	collector: collector
}