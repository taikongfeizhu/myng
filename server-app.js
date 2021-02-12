// 导入Express模块，并创建Express应用程序对象
var express = require('express');
var app = express();

// 注册HTTP请求体解析中间件body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// 中间件配置：允许客户端请求服务端目录/node_modules、/src和/images下的静态资源
app.use('/node_modules', express.static('node_modules'));
app.use('/src', express.static('src'));
app.use('/images', express.static('images'));

// 注册客户业务Web API
var customerApi = require('./web-api/customer-api');
app.post('/api/customer/sign-up', function (req, res) {
    customerApi.signUp(req, res);
});
app.post('/api/customer/log-in', function (req, res) {
    customerApi.logIn(req, res);
});
app.get('/api/customer/name', function(req, res) {
    customerApi.getAuthName(req, res);
});
app.get('/api/customer/log-out', function(req, res) {
    customerApi.logOut(req, res);
});

// 注册商品业务Web API
var wareApi = require('./web-api/ware-api');
app.get('/api/ware/list', function(req, res) {
    wareApi.list(req, res);
});
app.get('/api/ware/detail', function(req, res) {
    wareApi.detail(req, res);
});
app.get('/api/ware/search', function(req, res) {
    wareApi.search(req, res);
});

// 注册购物车业务Web API
var cartApi = require('./web-api/cart-api');
app.post('/api/cart/add', function(req, res) {
    cartApi.addWare(req,res);
});
app.get('/api/cart/list', function(req, res) {
    cartApi.getWares(req,res);
});
app.post('/api/cart/remove', function(req, res) {
    cartApi.removeWare(req,res);
});
app.post('/api/cart/update', function(req, res) {
    cartApi.updateWareCount(req,res);
});
app.get('/api/cart/total-count', function(req, res) {
    cartApi.getTotalCount(req,res);
});

// 路由配置：当客户端请求服务端根路径（即http://localhost:50424/）时，返回目录src下的HTML文件index.html
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/src/index.html');
});

// 启动应用程序，并监听50424端口上的请求
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('当前应用程序正在监听http://%s:%s', host, port);
});
