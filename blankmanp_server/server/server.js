/*
* @Author: blankmanp
* @Date:   2016-02-04 09:43:54
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-02-16 11:12:03
*/

'use strict';
let _ = require('lodash');
let fs = require('fs');
let koa = require('koa');
let koarouter = require('koa-router');
let koastatic = require('koa-static');

let app = koa();
let router = koarouter();

let layout = fs.readFileSync(__dirname + '/view/html/layout.html');

router.get('/start', function *(next) {
    let data = {
        title: 'blankmanp',
        test: 'why so serious?'
    };
    this.body = _.template(layout)(data);
});

router.get('/example/:example', function *(next) {
    let data = {
        title: 'example page',
        test: 'have fun'
    };
    this.body = _.template(layout)(data);
})

router.redirect('/', '/start');

app.use(router.routes());

app.listen(8888);