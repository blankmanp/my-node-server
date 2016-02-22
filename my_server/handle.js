/* 
* @Author: blankmanp
* @Date:   2016-02-22 11:49:29
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-22 15:29:17
*/

'use strict';

const fs = require('fs');
const url = require('url');
const path = require('path');
const util = require('util');
const querystring = require('querystring');
const _ = require('lodash');
const formidable = require('formidable');

let cache = {};
let mimeTypes = {
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.html': 'text/html'
};

let handle = {
    index: {
        _render: (request, response) => {
            let link = url.parse(decodeURI(request.url));
            let file = link.pathname;
            file.indexOf('.') === -1 && (file += '.html');
            let filePath = `./static/${file}`;
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    response.writeHead(404);
                    response.end('' + err);
                    return;
                }
                let updateTime = Date.parse(stats.ctime);
                let isUpdated = cache[file] && cache[file]._timeStamp < updateTime;
                if (!cache[file] || isUpdated) {
                    console.log(`read ${file} from file`)
                    fs.readFile(filePath, (err, data) => {
                        if (err) {
                            response.end('' + err);
                            return;
                        }
                        cache[file] = {
                            _content: data,
                            _timeStamp: Date.now()
                        };
                        response.writeHead(200, {'Content-Type': mimeTypes[path.extname(file)]});
                        response.end(data);
                    })
                    return;
                }
                console.log(`read ${file} from cache`);
                response.writeHead(200, {'Content-Type': mimeTypes[path.extname(file)]});
                response.end(cache[file]._content);
            })
        },

        uploadFile: {
            _render: (request, response) => {
                if (request.method !== 'POST') {
                    return;
                }
                let form = new formidable.IncomingForm();
                form.uploadDir = 'uploads';
                form.on('file', (field, file) => {
                    if (file.size === 0) {
                        response.write('no file\n');
                        return;
                    }
                    response.write(`${file.name} was received\n`);
                }).on('end', () => {
                    response.end('done!');
                });
                form.parse(request);
            }
        }
    }
}

module.exports = handle;