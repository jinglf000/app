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
                $window.location.href = "/home";
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