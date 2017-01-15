var express = require('express');
var session = require('express-session');
var app = express();
 
app.use(session({
    secret: 'hello app', //secret的值建议使用随机字符串
    cookie: {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
}));
app.get('/', function (req, res) {
    if (req.session.sign) {//检查用户是否已经登录
		console.log(req);
        res.send('welecome <strong>' + req.session.name + '</strong>, 欢迎你h都ds是ello再次登录');
    } else {
        req.session.sign = true;
        req.session.name = '汇智网';
        res.send('欢迎登陆！');
    }
});
app.listen(9999);