/**
 * create 2017-1-16  
 * auto : jinglf
 */
var appHome = angular.module("appHome",['ngMessages','ngRoute','ngAnimate']);
appHome.run(function($rootScope,checkUserLogin,$window,$location){
    // 检测用户登录状态
    var checkUserLogined = function(e,next,current){
        var checkUserLoginObj =  new checkUserLogin();
        checkUserLoginObj.userPromise.then(function(response){
            // console.log(e,next,current);
            if(!response.data.code){
                $window.alert("请重新登录！");
                window.location.href = "login";
            }
        },function(response){
            // 请求拒绝的处理
            // console.log(response);
        });
    };  
    // 事件绑定
    $rootScope.$on("$routeChangeStart",checkUserLogined);
});
appHome.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    // 配置路由模式
    $locationProvider.html5Mode(true);
    // 配置路由
    $routeProvider.when('/appHome',{
        templateUrl : 'views/appHome.html',
        controller : 'homeController'
    })
    .when("/appMessage",{
        templateUrl : 'views/appMessage.html'
    })
    .when('/appMarkdown',{
        templateUrl : 'views/appMarkdown.html'
    })
    .when("/appSetting",{
        templateUrl : "views/appSetting.html"
    })
    .otherwise({
        redirectTo : "/"
    });
}]);

appHome.controller("appHomeController",['$http','$scope','$window',function($http,$scope,$window){
    // 退出登录
    $scope.logout = function(e){
        $http.get("/logout").then(function(response){
            if(response.data.code){
                $window.location.href = "/login";
            }
        });
    };
}]);
// 主页
appHome.controller("homeController",function($http,$scope){

});

// service 服务的 原型定义法，引用实例的时候会 new 一下这个匿名函数
// factory 服务的 工厂函数定义法，引用实例的时候会  执行一下这个工厂函数，
// 因此通常情况下，factory 会返回一个对象以供使用
appHome.service('checkUserLogin', ['$http', function($http){
    return function(){
        this.userPromise = $http.get("/home/userLogin");
    };
}]);
appHome.directive("slideTag",function(){
    return {
        restrict : "A",
        link   : function(scope,element,attrs){
            var $ = angular.element;
            element.find("li a").each(function(index,ele){
                $(ele).attr('num',index);
            });
            element.on("click","a",function(e){
                element.find("a.home_has_choiced").removeClass('home_has_choiced');
                $(this).addClass('home_has_choiced');
                var panel = document.getElementById(attrs.slideTag);
                $(panel).find("li").removeClass("home_should_show");
                $(panel).find("li:eq('" + parseInt(this.getAttribute('num')) +"')").addClass("home_should_show");
            });
        }
    };
});
appHome.directive("hasChoiced",function(){
    return {
        restrict : "A",
        link : function(scope,ele,attrs){
            var $ = angular.element;
            ele.on("click","a",function(e){
                ele.find(".a_has_choiced").removeClass('a_has_choiced');
                $(this).addClass("a_has_choiced");
            });
        }
    }; 
});

