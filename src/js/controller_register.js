/**
 * Created by jinglf on 2017/1/4.
 */
var register = angular.module("reg",[]);
register.controller("regControl",['$scope',function ($scope) {
    $scope.print = function(){
        console.log($scope.regForm.user);
        $scope.regForm.user += "xyz";
    }

    // $scope.check_equal = function () {
    //     if($scope.regForm.pass.$modelValue != $scope.regForm.confirmPass.$modelValue){
    //         $scope.regForm.confirmPass.$invalid = true;
    //         $scope.regForm.confirmPass.$error.no_equal = false;
    //     }
    // }
}])
register.directive("checkUser",['$http','$q',function($http,$q){
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
        }
    };
}]);