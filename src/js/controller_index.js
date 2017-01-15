/**
 * Created by td on 2017-01-12. index 主页应用
 */

var app_index = angular.module("index",["ngMessages"]);
// 路由：
app_index.config(function ($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl : 'views/home.html',
            controller : 'homeController'
        })
        .when("/login",{
            templateUrl : 'views/login.html',
            controller : 'loginController'
        })
        .when("/register",{
            templateUrl : 'views/register.html',
            controller : 'registerController'
        })
        .otherwise({
            redirectTo : "/"
        })
});
app_index.controller("appIndex",function($scope,$location,$timeout){


});

app_index.controller("homeController",function($scope,$http){

});
app_index.controller("loginController",function($scope,$http){

});
app_index.controller("registerController",function($scope,$http){

});