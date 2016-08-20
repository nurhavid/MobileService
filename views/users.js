var module = angular.module('myApp' , []);
module.controller('MainCtrl', ['$scope','$http',function($scope,$http){
	$scope.user={};
	$scope.user.username='';
	$http({
		method: 'POST',
		url: 'http://localhost:3000/api/users',
		headers : { "x-access-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBhc3N3b3JkIjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsInBhc3N3b3JkIjp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9fdiI6MCwicGFzc3dvcmQiOiIkMmEkMTAkL2FQV3hhM3VOU3R5VXljNXd0WUE4LjAxay4ubUQ2VWZVckU2LnpJRkJ1TXh5alc2cGhuWWUiLCJ1c2VybmFtZSI6Indpc2UiLCJfaWQiOiI1N2I4MDVhYzFjYmRlZTFjMzc1NzYzZTMifSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbCxudWxsXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltudWxsXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W10sIiRfX29yaWdpbmFsX3ZhbGlkYXRlIjpbXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbXX0sImlhdCI6MTQ3MTY4NTcwNiwiZXhwIjoxNDcxNzcyMTA2fQ.ymxWfsitEivXj2jFQs8hY7Qub6A5ju2ui3RUWw_w5xo"},
	}).success(function(data,status,headers,config){
		console.log(data)
		
		if(data){
			$scope.members=data;
		}else{
		}
	}).error(function(data,status,headers,config){
		console.log(status)
	});
}] );