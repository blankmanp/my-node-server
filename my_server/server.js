/* 
* @Author: blankmanp
* @Date:   2016-02-18 15:09:43
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-18 16:43:28
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
}

http.createServer((req, res) => {
    let link = url.parse(decodeURI(req.url));
    let lookup = link.pathname === '/index' ? 'index.html' : link.pathname;
    fs.exists(`./static/${lookup}`, function(exist){
        if (exist) {
            fs.readFile(`./static/${lookup}`, function(err, data) {
                if (err) {
                    res.writeHead(500);
                    res.end('' + err);
                } else {
                    let extname = path.extname(lookup);
                    res.writeHead(200, {'Content-Type': mimetypes[extname]});
                    res.end(data);
                }
            })
            return;
        } else {
            res.write(404);
            res.end();
        }
    })
}).listen(8888);