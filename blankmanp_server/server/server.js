/*
* @Author: blankmanp
* @Date:   2016-02-04 09:43:54
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-12 14:55:42
*/

'use strict';

let http = require('http');
let fs = require('fs');

function server(handle, route) {
    http.createServer((request, response) => {
        if (request.url === '/favicon.ico') {
            response.end();
            return;
        }
        route(handle, request, response);
    }).listen(8888);
}

exports.start = server;