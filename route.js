/**
 * Created by td on 2017-01-11.
 */
// node 服务用于启动 angular 页面的测试
var path   = require('path');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var querystring = require("querystring");
var session = require("express-session");
var assert = require("assert");

function route(app,dbModels){
    // 路由控制

    app.get("/login",function(req,res){
        if(req.session.sign){//检查用户是否已经登录，如果已登录展现的页面
            res.sendfile("./src/about.html");
        }else{
            res.sendfile("./src/login.html");
        }
    });
    app.get("/logout",function(req,res){
        req.session.destroy();
        res.json({code:true});
    });
    app.get("/about",function(req,res){
        res.sendfile("./src/about.html");
    });
    app.get("/home",function(req,res){
        res.sendfile("./src/home.html");
    });
    app.get("/register",function(req,res){
        res.sendfile("./src/register.html");
    });
    app.get("/home/userLogin",function(req,res){
        if(req.session.sign){//检查用户是否已经登录，如果已登录展现的页面
            res.json({
                code : true
            });
        }else{
            res.json({
                code : false
            });
        }
    });
    app.get("/app/userCheck",function (req,res) {

        var user_data = req.query.user;
        console.log(user_data);
        dbModels.userModel.findOne({"user":user_data},function(err,data){
            assert.equal(null,err);
            var res_data = {};
            if(!data){
                res_data.code = false;
                // res_data.msg  = "用户名可以使用";
            }else{
                res_data.code = true;
                res_data.msg  = "用户名重复";
            }
            res.json(res_data);
        });
    });
    app.post("/in",function(req,res){
        // req_data post请求的数据
        var req_data = req.body;
        console.log(req_data);
        dbModels.userModel.findOne({"user":req_data.user,"pass":req_data.pass},function(err,data){
            assert.equal(null,err);
            var res_data = {};
            if(!data){
                res_data.code = 0;
                res_data.msg = "用户名或密码不存在";
            }else{
                res_data.code = 1;
                res_data.msg = "登陆成功";
                req.session.sign = true;
                req.session.name = req_data.user;
            }
            res.json(res_data);
        });
    });
    app.post("/app/register",function (req,res) {
        // post Data
        var reqData = req.body;
        console.log(reqData);
        var newUser = new dbModels.userModel();
        newUser.user = reqData.user;
        newUser.pass = reqData.pass;
        newUser.name = reqData.name;
        newUser.phone = reqData.phone;
        newUser.age   = reqData.age;
        newUser.save(function (err,dataNew,effect) {
            assert.equal(null,err);
            if(err){
                res.json({
                    code : false
                });
            }else{
                res.json({
                    code : true
                });
            }
        });
    });
    app.get(/app\d*/,function (req, res) {
        res.sendfile("./src/index.html");
    });
}




exports.route = route;
