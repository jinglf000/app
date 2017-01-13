/**
 * Created by td on 2017-01-11.
 */
// node 服务用于启动 angular 页面的测试
var path   = require('path');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var querystring = require("querystring");
function route(app,dbModels){
    // 路由控制
    app.get("/",function(req,res){
        res.sendfile("./src/index.html");
    }).get("/login",function(req,res){
        res.sendfile("./src/login.html");
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
}



var assert = require("assert");
exports.route = route;
