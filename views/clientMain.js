/**
 * Created by ajou on 8/17/2016.
 */
/**
 * Created by ajou on 8/15/2016.
 */
var module = angular.module('myApp',['ngCookies']);

module.controller('myCtrl',['$scope', '$http', '$cookieStore',function($scope, $http, $cookieStore){
    $scope.items=[
        {num:'Day',contents1:'Contents'},
    ];
    $scope.login = function(){
            $http({
                method:'POST',
                url:'http://localhost:3000/api/login',
                data:{'username':$scope.usernameL,'password':$scope.passwordL}
            })
                .success(function(data,status,headers,config){
                    if(data.success){
                            alert(data.message);
                            $cookieStore.put('username',$scope.usernameL);
                            $cookieStore.put('token',data.token);
                            window.location="summary.html";

                        // $http({
                        //     method:'GET',
                        //     url:'http://localhost:3000/api',
                        // })
                        //     .success(function(data,status,headers,config){
                        //         for(var i=0;i<data.length;i++){
                        //             $scope.items.push(data[i]);
                        //         }
                        //     })
                        //     .error(function(data,status,headers,config){
                        //         console.log(status);
                        //     });

                    }else{
                            alert(data.message);
                    }
                })
                .error(function(data,status,headers,config){
                    console.log(status);
                    alert("Error");
                });



    };

    $scope.register = function(){
        if($scope.passwordR==$scope.passwordCR){
            $http({
                method:'POST',
                url:'http://localhost:3000/api/register',
                data:{'username':$scope.usernameR,'password':$scope.passwordR}
            })
                .success(function(data,status,headers,config){
                    if(data.success){
                        alert(data.message);
                        window.location="index.html";

                    }else{
                        alert(data.message);
                    }
                })
                .error(function(data,status,headers,config){
                    console.log(status);
                    alert("Error");
                });
        }else{
            alert("Password doesn't match!")
        }




    };

    $scope.checkCookies = function(){
        $scope.userCookie = $cookieStore.get('username');
        $scope.tokenCookie = $cookieStore.get('token');
        if($scope.userCookie) {
            window.location = "summary.html";
        }
    };

    $scope.checkCookiesMain = function(){
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

    }
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
