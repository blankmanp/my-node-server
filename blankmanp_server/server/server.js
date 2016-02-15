/*
* @Author: blankmanp
* @Date:   2016-02-04 09:43:54
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-15 17:41:35
*/

'use strict';

let route = require('./router');
let http = require('http');
let fs = require('fs');

let app = {};
let methods = ['get', 'post', 'pull', 'del'];

app.listen = (port) => {
    http.createServer((request, response) => {
        if (request.url === '/favicon.ico') {
            response.end();
            return ;
        }
        route(request, response);
    }).listen(port);
}

module.exports = app;