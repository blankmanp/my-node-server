/* 
* @Author: blankmanp
* @Date:   2016-02-22 11:49:29
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-04-04 21:27:49
*/

'use strict';

const fs = require('fs');
const url = require('url');
const path = require('path');
const util = require('util');
const querystring = require('querystring');
const _ = require('lodash');
const formidable = require('formidable');

const myBabel = require('./myBabel');

let staticSource = './static';
let cache = {};
let mimeTypes = {
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.html': 'text/html'
};
let filePath = {
    '.css': `${staticSource}/css`,
    '.js': `${staticSource}/js`
}

let handle = {
    index: {

        fun: {
            _render: (request, response) => {
                response.on('readable', () => {
                    console.log(request.read());
                })
                response.end('hhh\n');
            }
        },

        uploadFile: {
            _render: (request, response) => {
                if (request.method !== 'POST') {
                    response.writeHead(404);
                    response.end('The page don\'t exist');
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
        },

        download: {
            _render: (request, response) => {
                response.writeHead(200, {'Content-Disposition': 'attachment;filename=test.js'})
                let options = {};
                options.file = 'handle.js';
                options.fileSize = fs.statSync(options.file).size;
                options.kbps = 1;
                let download = Object.create(options);
                download.chunk = new Buffer(options.fileSize);
                download.bufferOffset = 0;
                fs.createReadStream(options.file)
                .on('data', (chunk) => {
                    chunk.copy(download.chunk, download.bufferOffset);
                    download.bufferOffset += chunk.length;
                })
                .once('open', () => {
                    let downloadAbort = throttle(download, (sent, done) => {
                        if (done) {
                            response.end(sent);
                            return;
                        }
                        response.write(sent);
                    })
                    request.on('close', downloadAbort);
                });

                function throttle(download, callback) {
                    let chunkOutSize = download.kbps * 1024;
                    let timer = 0;

                    (function loop(byteSent){
                        let remainingOffset;
                        if (!download.aborted) {
                            setTimeout(() => {
                                let byteOut = chunkOutSize + byteSent;
                                if (download.bufferOffset > byteOut) {
                                    timer = 1000;
                                    callback(download.chunk.slice(byteSent, byteOut));
                                    loop(byteOut);
                                    return;
                                }
                                if (byteOut >= download.chunk.length) {
                                    remainingOffset = download.chunk.length - byteSent;
                                    let done = true;
                                    callback(download.chunk.slice(byteSent, download.chunk.length), done);
                                    return;
                                }
                                loop(byteSent);
                            }, timer)
                        }
                    }(0));
                    return function() {
                        download.aborted = true;
                    }
                }
            }
        },

        test: {
            _render: (request, response) => {}
        }
    },

    algorithm: {
        _render: (request, response) => {
            fs.stat(`${filePath['.js']}/sort.js`, (err, stats) => {
                let sortStats = fs.statSync(`${staticSource}/algorithm/sort.js`);
                if (err || Date.parse(stats.mtime) < Date.parse(sortStats.mtime)) {
                    myBabel.transformFileSync(`${staticSource}/algorithm/sort.js`);
                }
                myBabel.watchAndWrite(`${staticSource}/algorithm/sort.js`);
                let page = fs.readFileSync(`${staticSource}/algorithm/index.html`);
                response.writeHead(200);
                response.end(page);
            })
        }
    }
}

module.exports = handle;