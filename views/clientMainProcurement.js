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

        if(!$scope.userCookie||!$scope.tokenCookie) {
            window.location = "index.html";
        }else{

        }


    };
    $scope.addProcurement = function(){
        $http({
            method:'POST',
            url:'http://localhost:3000/api/addProcurement',
            data: {token: $scope.tokenCookie,
                'username':$scope.userCookie,
                'itemname':$scope.itemnameA,
                'qty':$scope.qtyA,
                'buyprice':$scope.buypriceA,
                'sellprice':$scope.sellpriceA,
                'date':$scope.dateA+" 00:00:00"
            }
        })
            .success(function(data,status,headers,config){
                alert(data.message);
                alert($scope.dateA+" 00:00:00");
            })
            .error(function(data,status,headers,config){
                console.log(status);
            });
    };

    $scope.signout = function(){
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
