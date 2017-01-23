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
    //  登录
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
    // 注册
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
    // 新增信息
    app.post("/app/infoAdd",function (req,res) {
        if(!req.session.sign){res.redirect("/login");};
        var reqData = req.body;
        console.log(reqData);
        var newInfo = new dbModels.appInfoModel();
        newInfo.name = reqData.name;
        newInfo.age = reqData.age;
        newInfo.height = reqData.height;
        newInfo.weight = reqData.weight;
        newInfo.sex = reqData.sex;
        newInfo.phone = reqData.phone;
        newInfo.email = reqData.email;
        newInfo.address = reqData.address;
        newInfo.info    = reqData.info;
        newInfo.save(function(err,dataNew,effect){
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
    // 查询信息
    app.get("/app/infoSearch",function(req,res){
        if(!req.session.sign){res.redirect("/login");};
        var reqData = req.query.name;
        console.log(reqData);
        var query;
        if(reqData){
            query = {
                'name' : /[\w\W]/
            }
        }else{
            query = {
                'name' : new RegExp(reqData)
            }
        }
        dbModels.appInfoModel.find(query,function(err,list){
            assert.equal(null,err);
            if(list){
                res.json({
                    list : list,
                    length : list.length
                });
            }else{
                res.json({
                    list : list,
                    length : list.length
                });
            }
        })
    });
    app.get(/app\d*/,function (req, res) {
        res.sendfile("./src/index.html");
    });
}




exports.route = route;
