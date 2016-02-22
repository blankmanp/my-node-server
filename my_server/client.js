/* 
* @Author: blankmanp
* @Date:   2016-02-22 11:23:09
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-22 11:49:44
*/

'use strict';

const http = require('http');
const fs = require('fs');

let urlOptions = {
    host: 'localhost',
    path: '/test',
    method: 'GET',
    port: 8888
};

let request = http.request(urlOptions, (response) => {
    response.on('data', (chunk) => {
        console.log(chunk.toString());
    })
})
request.end();