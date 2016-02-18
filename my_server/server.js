/* 
* @Author: blankmanp
* @Date:   2016-02-18 15:09:43
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-18 18:28:31
*/

'use strict';

const http = require('http');
const url = require('url');
const path = require('path');
const querystring = require('querystring');
const fs = require('fs');


let mimetypes = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.html': 'text/html'
};

let cache = {};

http.createServer((req, res) => {
    let link = url.parse(decodeURI(req.url));
    let lookup = link.pathname === '/index' ? 'index.html' : link.pathname.slice(1);
    if (lookup === 'favicon.ico') {
        res.end();
        return;
    }
    fs.stat(`./static/${lookup}`, function(err, stats){
        if (err) {
            res.writeHead(404);
            res.end('' + err);
            return;
        }
        let updateTime = Date.parse(stats.ctime);
        let isUpdated = !!cache[lookup] && updateTime > cache[lookup].timestamp;
        if (!cache[lookup] || isUpdated) {
            fs.readFile(`./static/${lookup}`, function(err, data) {
                console.log(`load ${lookup} from file`);
                cache[lookup] = {
                    content: data,
                    timestamp: Date.now()
                };
                res.writeHead(200, {'Content-Type': mimetypes[path.extname(lookup)]});
                res.end(data);
            })
            return;
        }
        console.log(`load ${lookup} from cache`);
        res.writeHead(200, {'Content-Type': mimetypes[path.extname(lookup)]});
        res.end(cache[lookup].content);
    })
}).listen(8888);