/**
 * Created by nur on 19/08/2016.
 */
var module = angular.module('myApp', []);

module.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
    $scope.user={};
    $scope.submit= function(){
        $http({
            method:'POST',
            url:'http://localhost:3000/api/insert',
            headers: {"x-access-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiaW5zZXJ0aW5nIjp0cnVlLCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJyZXF1aXJlIiwidXNlcm5hbWUiOiJyZXF1aXJlIn0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6e30sIm1vZGlmeSI6e30sInJlcXVpcmUiOnsicGFzc3dvcmQiOnRydWUsInVzZXJuYW1lIjp0cnVlfX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX2lkIjoiNTdiODAzY2VmM2YwZDYxYzFmNWEwM2Q5IiwicGFzc3dvcmQiOiIkMmEkMTAkZ2FWWlNVbENqSnlFUWcxSmdYRWt4dWRRLnBlL1MzejhwcnZXU1RGVjF3Zi84cVl1R3hjQ2UiLCJ1c2VybmFtZSI6Im5hYml5YSIsIl9fdiI6MH0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGwsbnVsbF0sIiRfX29yaWdpbmFsX3ZhbGlkYXRlIjpbbnVsbF0sIiRfX29yaWdpbmFsX3JlbW92ZSI6W251bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdLCIkX19vcmlnaW5hbF92YWxpZGF0ZSI6W10sIiRfX29yaWdpbmFsX3JlbW92ZSI6W119LCJpYXQiOjE0NzE2NzczOTAsImV4cCI6MTQ3MTc2Mzc5MH0.opioa5J9Bi-SUYwkxFIW45BrN6rKry9MRi957BHSsx4"},
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