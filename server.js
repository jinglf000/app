// node 服务用于启动 angular 页面的测试
var express = require('express');
var path   = require('path');
var favicon   = require('serve-favicon');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// 设定 port 变量，访问端口
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));

// 设定view engine 变量，网页模板引擎
app.set('view engine', 'html');

// 静态文件目录
app.use(express.static(path.join(__dirname,"/src")));

// 中间件 用于处理
app.use(favicon(__dirname + '/src/images/logo_.png'));
app.use(logger('dev'));

// parse application/json
app.use(bodyParser.json());
app.use(methodOverride());


// 路由控制
app.get("/",function(req,res){
    res.sendfile("./src/index.html");
}).get("/login",function(req,res){
    res.sendfile("./src/login.html");
});
app.listen(app.get('port'));
console.log("server is runing");
