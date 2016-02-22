/* 
* @Author: blankmanp
* @Date:   2016-02-18 15:09:43
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-22 14:48:37
*/

'use strict';

const http = require('http');
const route = require('./route');

http.createServer((req, res) => {
    route(req, res);
}).listen(8888);