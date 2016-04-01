/* 
* @Author: blankmanp
* @Date:   2016-02-18 15:09:43
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-04-01 14:43:43
*/

'use strict';

const http = require('http');
const route = require('./route');

http.createServer((req, res) => {
    route(req, res);
}).listen(7777);