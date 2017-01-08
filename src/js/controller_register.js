/**
 * Created by jinglf on 2017/1/4.
 */
var register = angular.module("reg",[]);
register.controller("regControl",['$scope',function ($scope) {

    // $scope.check_equal = function () {
    //     if($scope.regForm.pass.$modelValue != $scope.regForm.confirmPass.$modelValue){
    //         $scope.regForm.confirmPass.$invalid = true;
    //         $scope.regForm.confirmPass.$error.no_equal = false;
    //     }
    // }
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
                if(!valid_username.test(value) && value){
                    return false;
                }
                return true;
            };
        }
    };
}]);
register.directive("oneToFifty",function($filter){
    return {
        require : "?ngModel",
        link : function(scope,ele,attr,ngModel){
            if(!ngModel) return;
            ngModel.$parsers.unshift(function (viewValue) {
                // if(ngModel.$error){return};
                if(!viewValue){return viewValue};
                var i = parseInt(viewValue);

                if(i >= 0 && i <= 50 ){
                    ngModel.$setValidity("oneToFifty",true);
                    return viewValue;
                }else{
                    ngModel.$setValidity("oneToFifty",false);
                    return undefined;
                }
            });
            ngModel.$formatters.unshift(function(viewValue){
               return $filter("number")(viewValue);
            });
        }
    }
});