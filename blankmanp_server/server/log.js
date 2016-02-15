/* 
* @Author: blankmanp
* @Date:   2016-02-11 10:40:50
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-11 11:10:18
*/

'use strict';

let fs = require('fs');

function writeLog(opt) {
    opt = opt || '';
    let data = opt + ' ' + new Date();
    let writeOption = {
        flag: 'a+'
    };
    fs.writeFile('log.txt', data + '\n', writeOption, function(err){
        if (err) throw err;
    })
}

exports.write = writeLog;