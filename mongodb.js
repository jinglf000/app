/**
 * Created by td on 2017-01-11. 数据库操作
 */
// node 服务用于启动 angular 页面的测试
var path   = require('path');
var favicon   = require('serve-favicon');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var querystring = require("querystring");
var mongoose = require("mongoose");
var assert = require("assert");


// 连接数据库
mongoose.connect("mongodb://localhost:27017/app");
var db = mongoose.connection;

// open 事件的监听函数
db.on('error',function callback(){
    console.log('数据库连接错误');
});
db.once("open",function(){
    console.log("成功连接数据库_！");
});

// 用户类型 schema
var schema  = mongoose.Schema;
var dbSchemas = {};
var dbModels  = {};
dbSchemas.userSchema = new schema({
    name : String,
    age  : Number,
    phone : String,
    autoLogin : Boolean,
    user : {
        type : String,
        required : true, // 不可为空
        validate : [function(val){
            var validate_user = /^((1\d{10})|([-\w]?\w+([-+.]\w+)*[-\w]?@[-\w]?\w+([-.]\w+)*[-\w]?\.[-\w]?\w+([-.]\w+)*[-\w]?))$/;
            if(validate_user.test(val)){
                return true;
            }else{
                return false;
            }
        },"用户名格式不正确"]
    },
    pass : {
        type : String,
        required : true
    }
});
dbModels.userModel = mongoose.model('logins',dbSchemas.userSchema);

exports.dbModels = dbModels;
