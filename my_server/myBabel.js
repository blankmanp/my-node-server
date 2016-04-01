/*
* @Author: blankmanp
* @Date:   2016-04-01 14:47:02
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-04-01 16:04:22
*/

'use strict';

const babel = require('babel-core');
const fs = require('fs');
const _ = require('lodash');

const jsFilePath = './static/js';

exports.transformFileSync = function transformFileSync(file, filename) {
    let result = babel.transformFileSync(file);
    let fileName = filename || file.split('/');
    _.isArray(fileName) && (fileName = fileName[fileName.length - 1].split('.')[0] + '.js');
    fs.writeFileSync(`${jsFilePath}/${fileName}`, result.code);
}

exports.watchAndWrite = function watchAndWrite(file, isDir) {
    fs.watch(file, (event, filename) => {
        if (event === 'change' && filename.endsWith('.js')) {
            if (isDir) {
                transformFileSync(file + filename, filename);
            } else {
                transformFileSync(file);
            }
        }
    })
}