/**
 * Created by td on 2017-01-05.
 */
var mongoose = require("mongoose");
mongoose.connect("mongodb://130.10.7.160:8888/chenyan");
var db = mongoose.connection;
// open 事件的监听函数
db.on('error',function callback(){
    console.log('数据库连接错误');
});
db.once("open",function(){
    console.log("成功连接数据库！");
});
