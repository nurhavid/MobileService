/**
 * Created by ajou on 8/17/2016.
 */
/**
 * Created by ajou on 8/15/2016.
 */
var module = angular.module('myApp',['ngCookies']);

module.controller('myCtrl',['$scope', '$http', '$cookieStore',function($scope, $http, $cookieStore){
    $scope.items={};

    $scope.checkCookies = function(){
        $scope.userCookie = $cookieStore.get('username');
        $scope.tokenCookie = $cookieStore.get('token');
        console.log($scope.tokenCookie);
        console.log($scope.userCookie);

        if(!$scope.userCookie) {
            window.location = "index.html";
        }else{
            $http({
                method:'POST',
                url:'http://localhost:3000/api/getInventory/'+$scope.userCookie,
                headers : {"x-access-token" :$scope.tokenCookie},
                data: {token: $scope.tokenCookie}
            })
                .success(function(data,status,headers,config){
                    $scope.items=data;
                })
                .error(function(data,status,headers,config){
                    console.log(status);
                });
        }


    };

    $scope.signout = function(){
        alert("signout");
        $cookieStore.remove('username');
        $cookieStore.remove('token');
        window.location="index.html";

    };

    $scope.tableClick=function(content){
        alert(content);

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
