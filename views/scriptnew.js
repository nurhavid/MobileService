

var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination','ngResource']);


function MyController($scope, $resource) {

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.members = [];

    var Team = $resource('http://localhost:3000/things/:N_item',
        {N_item:'@N_item'},
        {'query:':{method: 'GET', isArray:true}}
    );
    Team.query()
        .$promise.then(function(information){
        $scope.members=information;
    }, function(errResponse) {
        alert(errResponse)
        //fail
    });

    $scope.pageChangeHandler = function(num) {
        console.log('members page changed to ' + num);
    };

}


function OtherController($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
}


myApp.controller('MyController', MyController);
myApp.controller('OtherController', OtherController);

