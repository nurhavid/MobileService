/**
 * Created by ajou on 8/17/2016.
 */
/**
 * Created by ajou on 8/15/2016.
 */
var module = angular.module('myApp',['ngCookies']);

module.controller('myMainCtrl',['$scope', '$http', '$cookieStore',function($scope, $http, $cookieStore){
    $scope.items=[
        {num:'Day',contents1:'Contents'},
    ];

    $scope.checkCookies = function(){
        $scope.userCookie = $cookieStore.get('username');
        $scope.tokenCookie = $cookieStore.get('token');
        if(!$scope.userCookie) {
            window.location = "index.html";
        }
    };

    $scope.signout = function(){
        alert("signout");
        $cookieStore.remove('username');
        $cookieStore.remove('token');
        window.location="index.html";

    };

    $scope.
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
