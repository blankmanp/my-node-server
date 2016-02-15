/*
* @Author: blankmanp
* @Date:   2016-02-04 10:16:52
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-11 16:42:25
*/

'use strict';

let server = require('./server/server');
let handle = require('./server/handleRequest');
let route = require('./server/router');

server.start(handle, route.route);