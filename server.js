/**
 * Created by td on 2017-01-11.node 服务    serve----
 */
var express = require('express');
var path   = require('path');
var favicon   = require('serve-favicon');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var querystring = require("querystring");
var assert = require("assert");
var session = require("express-session");
var cookieParser = require('cookie-parser');

// 创建 erpress
var app = express();
function  start() {
	// 设定 port 变量，访问端口
	app.set('port', process.env.PORT || 8080);
	// 设定 视图
	app.set('views', path.join(__dirname,'views'));
	// 设定view engine 变量，网页模板引擎
	app.set('view engine', 'html');
	// 静态文件目录
	app.use(express.static(path.join(__dirname,"/src")));
	// 中间件 用于处理
	app.use(favicon(__dirname + '/src/images/logo_.png'));
	app.use(logger('dev'));
	// parse application/json
	// app.use(bodyParser.json());
	// app.use(methodOverride());
	// 数据解析
	app.use(bodyParser.json());  //body-parser 解析json格式数据
	app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
	  extended: true
	}));
	// 设置解析cookie
	app.use(cookieParser());
	app.use(session({
		secret : "web app test",// 为了安全性的考虑设置secret属性
		cookie : {maxAge : 60 * 1000 * 30},// 设置过期时间 10 分钟
		resave : true,
		saveUninitialized : false
	}));
	// 监听端口 port
	app.listen(app.get('port'));
	console.log("server is runing");
}
exports.app = app;
exports.start = start;