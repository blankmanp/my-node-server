/*
* @Author: blankmanp
* @Date:   2016-02-04 10:44:54
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-15 16:55:41
*/

'use strict';

let url = require('url');
let util = require('util');
let log = require('./log');
let handle = require('./handleRequest');
let querystring = require('querystring');

function route (request, response) {
    let requestUrl = (url.parse(request.url));
    let pathname = requestUrl.pathname.substring(1);
    pathname = pathname || 'start';
    if (typeof handle[pathname] === 'function') {
        let query = querystring.parse(requestUrl.query);
        handle[pathname](response, query);
    } else {
        response.writeHead(404);
        response.write('can\'t find the page you asked, please check the url and try again');
        response.end();
    }
}

module.exports = route;