#!/usr/bin/env node

var program = require('commander');
var font = require('../').font;
program
    .version(require('../package.json').version)
    .usage('[options] <file or dir ...>')
    .option('-s, --source <path>', 'character file path or dir')
    .option('-f, --font <path>', 'origin font file path')
    .option('-o, --output <filepath>', 'filepath to output font files')
    .parse(process.argv);

var checkParams = function() {
	if(!program.source) return 'source error: 请填写源文件路径';
	if(!program.font) return 'font error: 请填写字体路径';
	if(!program.output) return 'output error: 请填写输出路径';
	return false;
}

var err = checkParams();

if(err) {
	console.log(err);
} else {
	console.log(program.source);
	console.log(program.font);
	console.log(program.output);
	font.output(program);
}