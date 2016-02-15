/*
* @Author: blankmanp
* @Date:   2016-02-04 10:45:03
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-14 19:37:51
*/

'use strict';

let fs = require('fs');

function start(response) {
    response.write('test');
    response.end();
}

function getFile(response, query) {
    let filename = query.filename;
    let type = query.type ? query.type : 'txt';
    if (type !== 'txt') {
        response.write('you have no power to such type of file');
        response.end();
    } else if (/\./.test(filename)) {
        response.writeHead(403);
        response.write('can\'t read . in the path');
        response.end();
    } else {
        try {
            let fileData = fs.readFileSync('./' + filename + '.' + type);
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write(fileData);
        } catch(e) {
            response.write('' + e);
        }
        response.end();
    }
}

exports.start = start;
exports.file = getFile;