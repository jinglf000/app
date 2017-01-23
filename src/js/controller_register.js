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