/* 
* @Author: blankmanp
* @Date:   2016-02-22 11:49:29
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-26 22:21:42
*/

'use strict';

const fs = require('fs');
const url = require('url');
const path = require('path');
const util = require('util');
const querystring = require('querystring');
const _ = require('lodash');
const formidable = require('formidable');

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
                let options = {};
                options.file = '50meg';
                options.fileSize = fs.statSync(options.file).size;
                options.kbs = 32;
                let download = Object.create(options);
                download.chunk = new Buffer(options.fileSize);
                download.bufferOffset = 0;
                response.writeHead(200, {'Content-Length': options.fileSize});
                fs.createReadStream(options.file)
                .on('data', (chunk) => {
                    chunk.copy(download.chunk, download.bufferOffset);
                    download.bufferOffset += chunk.length;
                    response.write(`${download.bufferOffset}\n`);
                })
                .once('open', () => {
                })
                .on('end', () => {
                    response.end('done');
                })
                // function throttle(download, callback) {
                //     let chunkOutSize = download.kbps * 1024;
                //     let timer = 0;
                //     (function loop(byteSent) {
                //         if (!download.aborted) {
                //             setTimeout(() => {
                //                 let byteOut = byteSent + chunkOutSize;
                //                 if (download.bufferOffset > byteOut) {

                //                 }
                //             })
                //         }
                //     }(0))
                // }
            }
        }
    }
}

module.exports = handle;