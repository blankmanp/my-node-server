/* 
* @Author: blankmanp
* @Date:   2016-02-22 11:49:18
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-29 11:09:46
*/

'use strict';

const url = require('url');
const handle = require('./handle');
const path = require('path');
const fs = require('fs');
const staticSource = './static';
const mimeTypes = {
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.html': 'text/html'
};
const filePath = {
    '.css': `${staticSource}/css`,
    '.js': `${staticSource}/js`,
    '.html': `${staticSource}`
}

let cache = {} // 缓存

function route(req, res) {
    let link = url.parse(decodeURI(req.url));
    let pathname = path.normalize(link.pathname).substring(1);
    let temp = handle;
    // 如果是css/js/html文件就直接读取静态文件
    if (filePath[path.extname(pathname)]) {
        let tempFile = filePath[path.extname(pathname)]
        fs.stat(`${tempFile}/${pathname}`, (err, stats) => {
            if (err) {
                res.writeHead(404);
                res.end('' + err);
                return;
            }
            let updateTime = Date.parse(stats.ctime);
            let isUpdated = cache[pathname] && cache[pathname].timeStamp < updateTime;
            if (!cache[pathname] || isUpdated) {
                fs.readFile(`${tempFile}/${pathname}`, (err, data) => {
                    if (err) {
                        res.end('' + err);
                        return;
                    }
                    res.writeHead(200, {'Content-Type': mimeTypes[path.extname(pathname)]});
                    res.end(data);
                    cache[pathname] = {
                        content: data,
                        timeStamp: Date.now()
                    };
                });
            } else {
                res.writeHead(200, {'Content-Type': mimeTypes[path.extname(pathname)]});
                res.end(cache[pathname].content);
            }
        })
        return;
    }
    // 如果是路径则读取handle里面的方法，渲染对应的页面使用_render方法
    let pathnameArray = pathname.split('/');
    if (pathnameArray[0] === 'favicon.ico') {
        res.end();
        return;
    }
    pathnameArray[pathnameArray.length - 1] === '' && pathnameArray.splice(pathnameArray.length - 1);
    pathnameArray.every((v, index, arr) => {
        if (index !== arr.length - 1 && temp[v]) {
            temp = temp[v];
            return true;
        } else if (temp[v] && typeof temp[v]._render === 'function') {
            temp = temp[v];
            return true;
        } else {
            temp = undefined;
            // 如果没有这种方法就去寻找对应的html页面
            fs.stat(`${staticSource}/${pathname}.html`, (err, stats) => {
                if (err) {
                    fs.stat(`${staticSource}/${pathname}/index.html`, (error, indexStats) => {
                        if (error) {
                            res.writeHead(404);
                            res.end('page not found!');
                        } else {
                            fs.readFile(`${staticSource}/${pathname}/index.html`, (err, data) => {
                                res.writeHead(200, {'Content-Type': 'text/html'});
                                res.end(data);
                            })
                        }
                    })
                } else {
                    fs.readFile(`${staticSource}/${pathname}.html`, (err, data) => {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(data);
                    })
                }
            })
            return false;
        }
    })
    temp && temp._render(req, res);
}

module.exports = route;