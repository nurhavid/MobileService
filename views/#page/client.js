/**
 * Created by nur on 19/08/2016.
 */
var module = angular.module('myApp', []);
module.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
    $scope.user={};
    $scope.submit= function(){
        $http({
            method:'POST',
            url:'http://localhost:3000/insert',
            data : {item:$scope.item, qty:$scope.qty, price:$scope.price}
        })
            .success(function(data, status, headers, config){
                if(data){
                    alert(data);
                    //$scope.members=data;
                }else{

                }
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });
    };

}]);