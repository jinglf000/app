/**
 * Created by td on 2017-01-11. 服务引导文件
 */
var serve = require("./server.js");// 加载服务文件
var router = require("./route.js");// 路由
var mongodb = require("./mongodb.js");// 数据库

var dbModels = mongodb.dbModels;

serve.start();// 启动服务----
router.route(serve.app,dbModels);
