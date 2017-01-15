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
// module
var login = angular.module("login",['ngMessages']);
// controller
login.controller("appLogin",["$scope","$http","$window",function($scope,$http,$window){
    $scope.loginSubmit = function(){
        var postData = {
            user : $scope.user,
            pass : $scope.pass,
            autoLogin : $scope.autoLogin
        };
        // console.log(postData);
        var req = {
            method : "POST",
            url : "/in",
            data : postData
        };
        $http(req).then(function(result){
            // success
            console.log(result,"success");
            if(result.data.code == "1"){
                $window.location.href = "/";
                // $location.url("index.html");
            }
        },function(data){
            // fail
            console.log(data);
        });
    };
}]);



// 自定义验证器
// login.directive("username",usernameCheck);
// usernameCheck.$inject = ['$http','$q'];
// function usernameCheck(){
//     //...
// }
login.directive("checkUser",['$http','$q',function($http,$q){
    // email + cellPhone
    var valid_username = /^((1\d{10})|([-\w]?\w+([-+.]\w+)*[-\w]?@[-\w]?\w+([-.]\w+)*[-\w]?\.[-\w]?\w+([-.]\w+)*[-\w]?))$/;
    return {
        restrict: "A",
        require : 'ngModel',
        link : function($scope,element,attrs,ctrl){
            // 同步验证 model值 和 view值
            ctrl.$validators.username = function(modelValue,viewValue){
                var value = modelValue || viewValue;
                if(!valid_username.test(value)){
                    return false;
                }
                return true;
            };
            // 异步验证
            // ctrl.$asyncValidators.exist = function(modelValue, viewValue){
            //     var value = modelValue || viewValue; 
            //     var deferred = $q.defer();
            //     $http.get('api/users/' + value).then(function(res) {
            //         if(res.data.isExist){
            //             deferred.reject(false);
            //         }
            //         deferred.resolve(true);
            //     })
            //     return deferred.promise;
            // }
        }
    };
}]);
/**
 * Created by jinglf on 2017/1/4.
 */
var register = angular.module("reg",['ngMessages']);
register.controller("regControl",['$scope','$http','$window',function ($scope,$http,$window) {
    $scope.registerForm = function () {
        $http({
            "url" : "/app/register",
            "method" :"POST",
            "data" : {
                user :$scope.reg.user,
                pass :$scope.reg.pass,
                name :$scope.reg.name,
                age  :$scope.reg.age,
                phone  :$scope.reg.phone || ""
            }
        }).then(function (response) {
            if(response.data.code){
                $window.alert("恭喜你注册成功！");
                $window.location.href ="/";
            }
        },function (response) {
            console.log(response);
        });
    };
}]);
//这两种都是数据验证方式 各有优劣，先执行 $parse ---> $validators

register.directive("checkUser",['$http','$q',function($http,$q){
    // email + cellPhone
    var valid_username = /^((1\d{10})|([-\w]?\w+([-+.]\w+)*[-\w]?@[-\w]?\w+([-.]\w+)*[-\w]?\.[-\w]?\w+([-.]\w+)*[-\w]?))$/;
    return {
        restrict: "A",
        require : '?ngModel',
        link : function($scope,element,attrs,ctrl){
            // 同步验证 model值 和 view值
            ctrl.$validators.checkUser = function(modelValue,viewValue){
                var value = modelValue || viewValue;
                if(!valid_username.test(value)){
                    return false;
                }
                return true;
        };
        ctrl.$asyncValidators.checkUserAsync = function (modelValue,viewValue) {
            var value = modelValue || viewValue;
            // var deferred = $q.defer();
            return $http.get('/app/userCheck?user='+value).then(function (response) {
                //success
                console.log(response.data.code);
                if(response.data.code){
                    return $q.reject();
                }
            });
        };
        }
    };
}]);
register.directive("oneToFifty",function($filter){
    return {
        require : "?ngModel",
        link : function(scope,ele,attr,ngModel){
            if(!ngModel) return;
            ngModel.$validators.oneToFifty = function (viewValue) {
                // if(ngModel.$error){return};
                if(!viewValue){return viewValue};
                var i = parseInt(viewValue);
                if(i >= 0 && i <= 50 ){
                    return true;
                }else{
                    return false;
                }
            };
            ngModel.$formatters.unshift(function(viewValue){
               return $filter("number")(viewValue);
            });
        }
    }
});
register.directive("checkPhone",function () {
    return {
        restrict : "A",
        require : '?ngModel',
        link : function(scope,element,attrs,ngModel){
            var validate_phone = /^1\d{10}$/;
            ngModel.$validators.checkPhone  = function(modelValue,viewValue){
                var value = modelValue || viewValue;
                if(!validate_phone.test(value) && value){
                    return false;
                }
                return true;
            };
        }
    }
});
// register.directive("checkUser",function ($http) {
//     return {
//         restrict : "A",
//         require : "?ngModel",
//         link : function(scope,element,attrs,ngModel){
//
//         }
//     }
// })
var x = "myName";
var q = 123;