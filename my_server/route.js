/* 
* @Author: blankmanp
* @Date:   2016-02-22 11:49:18
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-22 15:10:03
*/

'use strict';

const url = require('url');
const handle = require('./handle')


function route(req, res) {
    let link = url.parse(decodeURI(req.url));
    let pathname = link.pathname.substring(1).split('/');
    let temp = handle;
    let wrongInfo = {};
    if (pathname[0] === 'favicon.ico') {
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