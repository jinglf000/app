/* *****************  这里是测试用例  ***************** */
// mongodb 数据库
var mongoClient = require('mongodb').MongoClient;
var assert = require("assert");// 用于控制错误信息 
var url = "mongodb://localhost:27017/app";// 地址
mongoClient.connect(url,function(err,db){// 连接测试
	assert.equal(null,err);
	console.log("正确连接到数据库服务...");
	db.close();
});
// 插入数据
var insertDocument = function(db, callback) {
	var _data = {
		"name" : "login 登陆用户列表",
		"description" : "这是一个login登陆测试，会插入到mongodb的非关系数据库里，",
		"author" : "jinglf000" ,
		"userList" : [
			{
				"num" : 0,
				"user" : "15503714903",
				"password" : "0"
			},
			{
				"num" : 1,
				"user" : "632080268@qq.com",
				"password" : "0"
			}
		]
    }
   	db.collection('login').insertOne( _data , function(err, result) {
		assert.equal(err, null);
		console.log("数据插入成功");
		callback();
  	});
};
mongoClient.connect(url,function(err,db){// 连接插入数据
	assert.equal(null,err);
	insertDocument(db,function(){
		db.close();
	})
});

// 使用mongoose操作mongo数据库
// 使用mongoose 操作 mongodb数据库
var mongoose = require("mongoose");
// 连接数据库
mongoose.connect("mongodb://localhost:27017/app");

var db = mongoose.connection;
// open 事件的监听函数
db.on('error',function callback(){
	console.log("数据库连接错误");
});
db.once("open",function(){
	console.log("成功连接数据库！");
});
db.on("open",function callback(){
	console.log("数据库操作");
});
	// 指定数据格式 schema
	var schema = mongoose.Schema;
	var userSchema = new schema({
		name : String,
		age  : Number,
		phone : String,
		user : String,
		pass : String,
		autoLogin : Boolean
	});

	// 把指定的数据格式 分给数据集，形成一个数据model
	var userModel = mongoose.model("login",userSchema);
	// 新建一个数据实例 ，以userModel来创建，entity继承model对象	
	var userEntity = new userModel({// 通过方法创建的实例是有数据库操作的能力的
		name : "张刘洋",
		age : 25,
		phone : "18516993208",
		user : "18516993208",
		pass : "0",
		autoLogin : false
	});

	userEntity.save(function(err,data){
		if(err){
			console.log(err);
		}else{
			console.log( data ,"save successful");
		}
	});
