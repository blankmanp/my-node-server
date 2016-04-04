/* 
* @Author: blankmanp
* @Date:   2016-02-18 15:09:43
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-04-04 21:03:41
*/

'use strict';

const http = require('http');
const route = require('./route');

require('babel-polyfill');

http.createServer((req, res) => {
    route(req, res);
}).listen(8888);