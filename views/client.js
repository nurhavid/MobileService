/**
 * Created by ajou on 8/17/2016.
 */
/**
 * Created by ajou on 8/15/2016.
 */
var module = angular.module('myApp',[]);

module.controller('myCtrl',['$scope', '$http',function($scope, $http){
    $scope.headerClass="header1";
    $scope.items=[
        {num:'Day',contents1:'Contents'},
    ];
    $scope.login = function(){

            $http({
                method:'POST',
                url:'http://localhost:3000/api',
                data:{'ID':$scope.myEmail,'PW':$scope.myPassword}
            })
                .success(function(data,status,headers,config){
                    if(data.length){
                            alert("Login success!");
                            $scope.headerClass="tall";
                            $scope.checked=true;

                        $http({
                            method:'GET',
                            url:'http://localhost:3000/api',
                        })
                            .success(function(data,status,headers,config){
                                for(var i=0;i<data.length;i++){
                                    $scope.items.push(data[i]);
                                }
                            })
                            .error(function(data,status,headers,config){
                                console.log(status);
                            });

                    }else{
                            alert("ID and password doesn't match");
                            $scope.myPassword="";
                    }
                })
                .error(function(data,status,headers,config){
                    console.log(status);
                });



    };

    $scope.tableClick=function(content){
        alert(content);
    }
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
