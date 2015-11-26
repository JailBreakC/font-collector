#!/usr/bin/env node

var program = require('commander');
var font = require('../').font;
var collector = require('../').collector;
var fs = require('fs');
program
    .version(require('../package.json').version)
    .usage('[options] <path pattern or filepath ...>')
    .option('-s, --source <path>', 'path pattern')
    .option('-i, --ignore <path>', 'ignore path pattern')
    .option('-f, --font <path>', 'origin font file path')
    .option('-o, --output <filepath>', 'filepath to output font files')
    .option('-c, --config <filepath>', 'load font.config.json file to run compile mission or set config file', './font.config.json')
    .parse(process.argv);

var checkParams = function() {
	if(!program.source) return 'source error: 请填写源文件路径';
	if(!program.font) return 'font error: 请填写字体路径';
	if(!program.output) return 'output error: 请填写输出路径';
	return false;
}

var loadConfig = function(path) {
	if(fs.statSync(path).isFile()) {
		font.output(JSON.parse(collector.readText(path)));		
	} else {
		console.log('%s is not file', path);
	}
}

if(program.args.length === 0 || program.compile) {
	loadConfig(program.compile)
	return
}



var err = checkParams();

if(err) {
	console.log(err);
} else {
	var config = {};
	config.source = {};
	program.source.path = program.source;
	program.source.ignore = program.ignore;
	program.font = program.font;
	program.output = program.output;

	console.log('source' + program.source);
	program.ignore && console.log('ignore' + program.ignore);
	console.log('font' + program.font);
	console.log('output' + program.output);

	font.output(program);
}


/**
 * Module dependencies.
 */

// var program = require('commander');

// program
//   .version('0.0.1')
//   .option('-p, --peppers', 'Add peppers')
//   .option('-P, --pineapple', 'Add pineapple')
//   .option('-b, --bbq-sauce', 'Add bbq sauce')
//   .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//   .parse(process.argv);

// console.log('you ordered a pizza with:');
// if (program.peppers) console.log('  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);