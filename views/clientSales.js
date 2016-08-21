/**
 * Created by nur on 21/08/2016.
 */

var module = angular.module('myApp',['ngCookies','angularUtils.directives.dirPagination']);

module.controller('myCtrl',['$scope', '$http', '$cookieStore',function($scope, $http, $cookieStore){
    $scope.sales={};

    $scope.currentPage = 1;
    $scope.pageSize = 10;

    $scope.checkCookies = function(){
        $scope.userCookie = $cookieStore.get('username');
        $scope.tokenCookie = $cookieStore.get('token');
        if(!$scope.userCookie||!$scope.tokenCookie) {
            window.location = "index.html";
        }else{
            $http({
                method:'POST',
                url:'http://localhost:3000/api/getSales/',
                data: {token: $scope.tokenCookie, username:$scope.userCookie}
            })
                .success(function(data,status,headers,config){
                    $scope.sales=data;
                    console.log(data);
                })
                .error(function(data,status,headers,config){
                    console.log(status);
                });
        }


    };

    $scope.signout = function(){
        $cookieStore.remove('username');
        $cookieStore.remove('token');
        window.location="index.html";

    };


}]);


module.directive('hoverClass',function(){
    return{
        restrict:'A', //attribute, can be Expression E,class C
        scope:{


        },
        link:function(scope, element){
            element.on('mouseenter',function(){
                element.addClass('reverse');
            })
            element.on('mouseleave',function(){
                element.removeClass('reverse');
            });
        }

    };
});
