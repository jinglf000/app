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
                $window.location.href = "login";
            }
            // else{
                // angular.element(document).find('.a_has_choiced').removeClass('a_has_choiced');
                // angular.element(document).find('a[href="'+$location.$$path+'"]').addClass('a_has_choiced');
            // }
        },function(response){
            // 请求拒绝的处理
            // console.log(response);
        });
    };  
    // 事件绑定
    $rootScope.$on("$routeChangeStart",checkUserLogined);
});
// 配置
appHome.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    // 配置路由模式
    $locationProvider.html5Mode(true);
    // 配置路由
    $routeProvider.when('/appHome',{
        templateUrl : 'views/appHome.html',
        controller : 'appHomeController'
    })
    .when("/appMessage",{
        templateUrl : 'views/appMessage.html',
        controller: "appMessageController"
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
// index
appHome.controller("indexController",['$http','$scope','$window',function($http,$scope,$window){
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
appHome.controller("appHomeController",function($http,$scope){
    
});
// message
appHome.controller('appMessageController',function($scope,$http,$window){
    // 新增信息
    $scope.submitMessage = function(){
        var posData = $scope.msg;
        $http.post("/app/infoAdd",posData).then(function(response){
            if(response.data.code){
                $window.alert("保存成功");
            }else{
                $window.alert("保存失败");
            }
        },function(response){
            console.log(response);
        });
    };
    $scope.search = {
        info : "",
        list : null
    };
    $scope.$watch("appMsgEditFlag",function(oldVal,newVal){
        console.log(oldVal,newVal);
    });
    // $scope.appMsgEditFlag = false;
    // 信息查询
    $scope.appMsgSearch = function(){
        var postData = $scope.search.info ;
        $http.get("/app/infoSearch?name="+postData).then(function(response){
            console.log(response);
            $scope.search.list = response.data.list;
        },function(response){

        });
    };
    // 信息删除
    $scope.appMsgDelete = function(index){
        var postData = $scope.search.list[index]._id;
        $http.get("/app/infoDelete?id="+postData).then(function(response){
            if(response.data.code){
                // 删除成功
                $scope.search.list.splice(index,1);
            }else{
                alert("删除失败");
            }
        },function(response){

        });
    };
    // $scope.appMsgEditFlag = true;
    // // 显示信息编辑
    // $scope.appMsgEditShow = function(index){
    // };
    $scope.appMsgEditFn = function(index){
        $scope.appMsgEditFlag = {
            flag : true,
            nowEditIndex : index
        };
        $scope.edit = $scope.search.list[index];
        $scope.dataCache = {};
        for(x in $scope.edit){
            $scope.dataCache[x]  = $scope.edit[x];
        };

    };
    // 修改提交 
    $scope.appMsgEditSubmit = function(){
        var postData = $scope.edit;
        console.log(postData);
        $http.post("/app/infoEdit",postData).then(function(response){
            if(response.data.code){
                alert("修改成功");
                $scope.appMsgEditFlag.flag = false;
            }else{
                $scope.search.list[$scope.appMsgEditFlag.nowEditIndex] = $scope.dataCache;
                alert("修改失败");
            }
            $scope.dataCache = null;
        },function(response){

        });
    };
});
// service 服务的 原型定义法，引用实例的时候会 new 一下这个匿名函数
// factory 服务的 工厂函数定义法，引用实例的时候会  执行一下这个工厂函数，
// 因此通常情况下，factory 会返回一个对象以供使用
appHome.service('checkUserLogin', ['$http', function($http){
    return function(){
        this.userPromise = $http.get("/home/userLogin");
    };
}]);


/**
 * 自定义指令，directive 也是一种服务，规则是函数必须返回固定值的对象，使用的是factory工厂模式
 * 服务定义方式中：factory 对应对象构造器中的工厂模式  
 * service：对应 对象构造器中的 构造函数模式
 * 
 */
appHome.directive("slideTag",function(){
    return {
        restrict : "A",
        link   : function(scope,element,attrs){
            var $ = angular.element;
            // 路由状态判断
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
appHome.directive("hasChoiced",function($location){//我是想了半天怎么注入，原来在这里就可以
    return {
        restrict : "A",
        require : "?ngModel",
        link : function(scope,ele,attrs,ngModel){
            var $ = angular.element;
            $(document).find("a[href='"+ $location.$$path +"']").addClass('a_has_choiced');
            ele.on("click","a",function(e){
                ele.find(".a_has_choiced").removeClass('a_has_choiced');
                $(this).addClass("a_has_choiced");
            });
        }
    }; 
});
appHome.directive("checkPhone",function(){
    return {
        restrict : "A",
        require : "?ngModel",
        link : function(scope,ele,attrs,ngModel){
            var  valid_phone = /^1\d{10}$/;
            ngModel.$validators.checkPhone = function(modelValue,viewValue){
                var value = modelValue || viewValue;
                if(!valid_phone.test(value)){
                    return false;
                }else{
                    return true;
                }
            };
        }
    };
});

/**
 * 注册过滤器
 * 字符超长显示...
 */
appHome.filter("limitLong" , function(){
    return function(input){
        if(input){
            if (input.length >= 10) {
                return input.slice(0, 10) + "...";
            }else{
                return input;
            }
        }
    };
});