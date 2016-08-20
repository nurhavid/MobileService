

var module = angular.module('myApp', ['ngResource']);

module.directive('form', function() {
    return{
        restrict: 'E',
        link: function(scope, element){
            scope.$watch("myLogIn", function () {
                if(scope.myLogIn){
                    element.addClass('hide_none');
                }else{
                    element.removeClass('hide_none');
                }
            })
        }

    }
});

module.directive('td', function(){
    return{
        restrict: 'E',
        link: function(scope, element){
            element.on('mouseenter', function(){
                element.addClass('reverse');
            });
            element.on('mouseleave', function(){
                element.removeClass('reverse');
            });
            element.on('click', function(){
                alert(element.html());
            })
        }

    };
});



module.controller('MainCtrl', ['$scope', '$resource', function($scope, $resource){
    $scope.myVar = false;// true
    $scope.myLogIn = false;
    $scope.myTab = {'height':'128px'};
    $scope.myLink = {'height': '60px'};
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



}]);


