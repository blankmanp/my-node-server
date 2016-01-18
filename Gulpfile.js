require('babel/register');

require('node-jsx').install({
	extension: 'jsx',
	harmony: true
})

var requireDir = require('require-dir');
requireDir('./gulp/tasks');
