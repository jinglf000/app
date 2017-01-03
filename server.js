// node 服务用于启动 angular 页面的测试
var express = require('express');
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
	console.log("成功连接数据库！");
});
// 指定数据格式 schema
var schema = mongoose.Schema;
var userSchema = new schema({
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
var userModel = mongoose.model('logins',userSchema);
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
// app.use(bodyParser.json());
// app.use(methodOverride());
// 数据解析 
app.use(bodyParser.json());  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));

// 路由控制
app.get("/",function(req,res){
    res.sendfile("./src/index.html");
}).get("/login",function(req,res){
    res.sendfile("./src/login.html");
});
app.post("/in",function(req,res){
	// req_data post请求的数据
	var req_data = req.body
	console.log(req_data);
	userModel.findOne({"user":req_data.user,"pass":req_data.pass},function(err,data){
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

app.listen(app.get('port'));
console.log("server is runing");
