/* 
* @Author: blankmanp
* @Date:   2016-02-22 11:49:18
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-26 12:06:24
*/

'use strict';

const url = require('url');
const handle = require('./handle');
const path = require('path');
const fs = require('fs');
const staticSource = './static';
let mimeTypes = {
    '.css': 'text/css',
    '.js': 'text/javascript'
};
const filePath = {
    '.css': `${staticSource}/css`,
    '.js': `${staticSource}/js`,
}


function route(req, res) {
    let link = url.parse(decodeURI(req.url));
    let pathname = path.normalize(link.pathname);
    let temp = handle;
    let wrongInfo = {};
    if (filePath[path.extname(pathname)]) {
        let tempFile = filePath[path.extname(pathname)]
        fs.stat(`${tempFile}/${pathname}`, (err, stats) => {
            if (err) {
                res.writeHead(404);
                res.end('' + err);
                return;
            }
            fs.readFile(`${tempFile}/${pathname}`, (err, data) => {
                if (err) {
                    res.end('' + err);
                    return;
                }
                res.writeHead(200, {'Content-Type': mimeTypes[path.extname(pathname)]});
                res.end(data);
            });
        })
        return;
    }
    pathname = pathname.substring(1).split('/');
    if (pathname[0] === 'favicon.ico') {
        res.end();
        return;
    }
    pathname.forEach((v) => {
        if (v.indexOf('.') !== -1) {
            v = v.split('.')[0];
        }
        if (temp[v]) {
            temp = temp[v];
        } else {
            wrongInfo.type = 404;
            wrongInfo.mess = 'page not found';
        }
    })
    if (!wrongInfo.type) {
        temp._render(req, res);
    } else {
        res.writeHead(wrongInfo.type);
        res.end(wrongInfo.mess);
    }
}

module.exports = route;