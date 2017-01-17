/**
 * Created by td on 2017-01-12. index 主页应用
 */

$(function(){
    $(".banner").unslider({
        speed : 500,// 速度
        delay : 3000,// 停留时间
        keys  : true,// 按件
        dots  : true,
        fluid : false,
        autoplay : true,
        arrows: false,
        animation: 'fade',
        infinite: true
    });
});


// var app_index = angular.module("index",["ngMessages","ngAnimate"]);
// // 路由：
// app_index.config(function ($routeProvider) {
//     $routeProvider
//         .when('/',{
//             templateUrl : 'views/home.html',
//             controller : 'homeController'
//         })
//         .when("/login",{
//             templateUrl : 'views/login.html',
//             controller : 'loginController'
//         })
//         .when("/register",{
//             templateUrl : 'views/register.html',
//             controller : 'registerController'
//         })
//         .otherwise({
//             redirectTo : "/"
//         });
// });
// app_index.controller("appIndex",function($scope,$location,$timeout){


// });

// app_index.controller("homeController",function($scope,$http){

// });
// app_index.controller("loginController",function($scope,$http){

// });
// app_index.controller("registerController",function($scope,$http){

// });