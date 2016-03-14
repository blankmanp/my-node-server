/*
* @Author: blankmanp
* @Date:   2016-02-04 09:43:54
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-03-14 13:16:12
*/

'use strict';
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const koa = require('koa');
const convert = require('koa-convert');
const session = require('koa-session');
const koarouter = require('koa-router');
const koastatic = require('koa-static');
const koaparser = require('koa-body-parser');
const username = 'blankmanp';
const password = 'varp!=Javascript';

let app = koa();
let router = koarouter();

let pages = fs.readdirSync('./stylesheet/html/');
let layout = fs.readFileSync('layout.html');

let noCheck = ['login', 'home', 'blog'];
let noNavPage = ['login.html'];

function requireLogin() {
    return function *(next) {
        if (!this.session.login) {
            this.redirect('/login');
        } else {
            yield next;
        }
    }
}
// 这只是很弱智的处理方法，一旦类型多了之后就爆炸了。。。。
function getBodyHTML(page) {
    let bodyLayout = fs.readFileSync(`./stylesheet/html/${page}`);
    let temp = '';
    let data = { user: this.session.login || '' };
    if (_.indexOf(noNavPage, page) === -1) {
        let templateFile = fs.readdirSync('./stylesheet/template/');
        let template = {};
        _.forEach(templateFile, (p) => {
            p = p.slice(0, -5);
            template[p] = fs.readFileSync(`./stylesheet/template/${p}.html`)
        });
        _.forEach(template, (p, i) => {
            data[i] = _.template(p)({ user: this.session.login || '', page: page.slice(0, -5) });
        })
    }
    temp = _.template(bodyLayout)(data);
    return temp || bodyLayout;
}

_.forEach(pages, (page) => {
    let temp = page.slice(0, -5);
    if (_.indexOf(noCheck, temp) === -1) {
        router.get(`/${temp}`, requireLogin());
    }
    router.get(`/${temp}`, function *(next) {
        let data = {
            title: `blankmanp-${temp}`,
            body: getBodyHTML.call(this, page)
        };
        this.body = _.template(layout)(data);
    })
})

router.post('/checkLogin', function *(next) {
    let data = JSON.parse(this.request.body);
    if (data.user === username && data.password === password) {
        this.session.login = data.user;
        this.body = { success: true };
    } else {
        if (data.user !== username) {
            this.body = { success: false, info: 1 }
        } else {
            this.body = { success: false, info: 2 }
        }
    }
})

router.get('/logout', function *(next) {
    this.session = null;
    this.redirect('/');
})


router.redirect('/', '/home');

app.keys = ['seccur'];

app.use(koaparser());
app.use(koastatic('stylesheet'));
app.use(session(app));
app.use(router.routes());

app.listen(1111);
