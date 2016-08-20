/**
 * Created by Fitri Purnama (피트리) on 8/15/2016.
 */
var app = angular.module('myApp', []);
app.controller('FormController', ['$scope', '$http', function ($scope, $http) {
    $http({
        method: 'POST',
        url: 'http://localhost:3000/home'
    })
        .success(function (data, status, headers, config) {
            if(data){
                $scope.members = data;
            }
            else {

            }
        })
        .error(function (data, status, headers, config) {
            console.log(status);
        });

    $scope.submit = function () {
        if($scope.username.$valid == false || $scope.password.$valid == false) {
            alert("ID or password is not failed.");
        }
        else {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data : {id: $scope.username, password: $scope.password}
        })
            .success(function (data, status, headers, config) {
                if(data[0].result==1){
                    $scope.members = data;
                    alert("Login Success");
                    window.location = "Home.html";
                }
                else {
                    alert("Login Fail");
                    window.location = "Login.html";
                }
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });

    }}
}]);

//access table test2
app.directive('td', function () {
    return {
        restrict: 'E',
        scope: {
        },
        link: function (scope, element, attr) {
            element.on('mouseenter', function () {
                element.addClass('reverse');
            });
            element.on('mouseleave', function () {
                element.removeClass('reverse');
            });
            element.on('click', function () {
                alert(element.html());
            });
        }
    };
});