/**
 * Created by nur on 19/08/2016.
 */
var module = angular.module('myApp', ['ngResource']);
module.controller('MainCtrl', ['$scope', '$resource', function($scope, $resource){
    var Team = $resource('http://localhost:3000/things/:N_item',
        {N_item:'@N_item'},
        {'get':{method: 'GET', isArray:false}},
        {'query:':{method: 'GET', isArray:true}}
    );



    $scope.submit= function(){
        if($scope.item !=null){
            Team.get({N_item:$scope.item}).$promise.then(function(information){
                $scope.item1=information.item;
                $scope.qty1=information.qty;
                $scope.price1=information.price;
            }, function(errResponse){
                //fail
            });
        }else{
            Team.query()
                .$promise.then(function(information){
                $scope.members=information;
            }, function(errResponse) {
                alert(errResponse)
                //fail
            });
        }
    };

}]);