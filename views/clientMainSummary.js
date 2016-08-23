

var module = angular.module('myApp',['ngCookies', 'angularUtils.directives.dirPagination']);

module.controller('myCtrl',['$scope', '$http', '$cookieStore',function($scope, $http, $cookieStore){
    $scope.historis={};
    $scope.dateA="2015-01-01";
    $scope.dateB="2016-12-30";
    $scope.currentPage = 1;
    $scope.pageSize = 10;

    $scope.submit=function () {
        $scope.date_from=$scope.dateA;
        $scope.date_to=$scope.dateB;
        $http({
            method:'POST',
            url:'http://localhost:3000/api/summary/',
            data: {token: $scope.tokenCookie,
                'username':$scope.userCookie,
                'datefrom': $scope.date_from+" 00:00:00",
                'dateto': $scope.date_to+" 00:00:00"}
        })
            .success(function(data,status,headers,config){
                $scope.historis=data.history;
                console.log(data.history);

                $scope.dataitemsales=data.dataitemsales;
                console.log(data.dataitemsales);

                $scope.dataitembuy=data.dataitembuy;
                console.log(data.dataitembuy);

                $scope.totalbuy=data.totalbuy;
                console.log(data.totalbuy);

                $scope.totalsale=data.totalsale;
                console.log(data.totalsale);

                $scope.profit=data.profit;
                console.log(data.profit);

                FusionCharts.ready(function(){
                    var tempe = JSON.parse(JSON.stringify(data.history).split("\"date\":").join("\"label\":").split("\"totalbuy\":").join("\"value\":"));
                    var tempe1 = JSON.parse(JSON.stringify(data.history).split("\"date\":").join("\"label\":").split("\"totalsales\":").join("\"value\":"));
                    var tempe2 = JSON.parse(JSON.stringify(data.history).split("\"date\":").join("\"label\":").split("\"totalprofit\":").join("\"value\":"));
                    var tempe3 = JSON.parse(JSON.stringify(data.dataitemsales).split("\"itemname\":").join("\"label\":").split("\"qty\":").join("\"value\":"));
                    var tempe4 = JSON.parse(JSON.stringify(data.dataitembuy).split("\"itemname\":").join("\"label\":").split("\"qty\":").join("\"value\":"));

                    console.log(tempe);
                    var revenueChart = new FusionCharts({
                        "type": "line",
                        "renderAt": "chartContainer",
                        "width": "350",
                        "height": "240",
                        "dataFormat": "json",
                        "dataSource":  {
                            "chart": {
                                "caption": "Total Buy",
                                "subCaption": "Ajuma's SuperMart",
                                "xAxisName": "Item",
                                "yAxisName": "Price (In KRW)",
                                "theme": "fint"
                            },
                            "data": tempe
                        }
                    });
                    revenueChart.render();

                    var revenueChart = new FusionCharts({
                        "type": "line",
                        "renderAt": "chartContainer2",
                        "width": "350",
                        "height": "240",
                        "dataFormat": "json",
                        "dataSource":  {
                            "chart": {
                                "caption": "Total Sales",
                                "subCaption": "Ajuma's SuperMart",
                                "xAxisName": "Item",
                                "yAxisName": "Price (In KRW)",
                                "theme": "fint"
                            },
                            "data": tempe1
                        }
                    });
                    revenueChart.render();

                    var revenueChart = new FusionCharts({
                        "type": "line",
                        "renderAt": "chartContainer3",
                        "width": "350",
                        "height": "240",
                        "dataFormat": "json",
                        "dataSource":  {
                            "chart": {
                                "caption": "Total Profit",
                                "subCaption": "Ajuma's SuperMart",
                                "xAxisName": "Item",
                                "yAxisName": "Price (In KRW)",
                                "theme": "fint"
                            },
                            "data": tempe2
                        }
                    });
                    revenueChart.render();

                    var revenueChart = new FusionCharts({
                        "type": "pie3d",
                        "renderAt": "chartContainer4",
                        "width": "600",
                        "height": "400",
                        "dataFormat": "json",
                        "dataSource":  {
                            "chart": {
                                "caption": "Data Item Sales",
                                "subCaption": "Ajuma's SuperMart",
                                "xAxisName": "Item",
                                "yAxisName": "Price (In KRW)",
                                "theme": "fint"
                            },
                            "data": tempe3
                        }
                    });
                    revenueChart.render();

                    var revenueChart = new FusionCharts({
                        "type": "pie3d",
                        "renderAt": "chartContainer5",
                        "width": "600",
                        "height": "400",
                        "dataFormat": "json",
                        "dataSource":  {
                            "chart": {
                                "caption": "Data Item Buy",
                                "subCaption": "Ajuma's SuperMart",
                                "xAxisName": "Item",
                                "yAxisName": "Price (In KRW)",
                                "theme": "fint"
                            },
                            "data": tempe4
                        }
                    });
                    revenueChart.render();
                })
            })
            .error(function(data,status,headers,config){
                console.log(status);
            });
    };


    $scope.checkCookies = function(){
        $scope.userCookie = $cookieStore.get('username');
        $scope.tokenCookie = $cookieStore.get('token');
        if(!$scope.userCookie||!$scope.tokenCookie) {
            window.location = "index.html";
        }else{
                $http({
                    method:'POST',
                    url:'http://localhost:3000/api/summary/',
                    data: {token: $scope.tokenCookie,
                        'username':$scope.userCookie,
                        'datefrom': $scope.dateA+" 00:00:00",
                        'dateto': $scope.dateB+" 00:00:00"}
                })
                    .success(function(data,status,headers,config){
                        $scope.historis=data.history;
                        console.log(data.history);

                        $scope.dataitemsales=data.dataitemsales;
                        console.log(data.dataitemsales);

                        $scope.dataitembuy=data.dataitembuy;
                        console.log(data.dataitembuy);

                        $scope.totalbuy=data.totalbuy;
                        console.log(data.totalbuy);

                        $scope.totalsale=data.totalsale;
                        console.log(data.totalsale);

                        $scope.profit=data.profit;
                        console.log(data.profit);

                        FusionCharts.ready(function(){
                            var tempe = JSON.parse(JSON.stringify(data.history).split("\"date\":").join("\"label\":").split("\"totalbuy\":").join("\"value\":"));
                            var tempe1 = JSON.parse(JSON.stringify(data.history).split("\"date\":").join("\"label\":").split("\"totalsales\":").join("\"value\":"));
                            var tempe2 = JSON.parse(JSON.stringify(data.history).split("\"date\":").join("\"label\":").split("\"totalprofit\":").join("\"value\":"));
                            var tempe3 = JSON.parse(JSON.stringify(data.dataitemsales).split("\"itemname\":").join("\"label\":").split("\"qty\":").join("\"value\":"));
                            var tempe4 = JSON.parse(JSON.stringify(data.dataitembuy).split("\"itemname\":").join("\"label\":").split("\"qty\":").join("\"value\":"));

                            console.log(tempe);
                            var revenueChart = new FusionCharts({
                                "type": "line",
                                "renderAt": "chartContainer",
                                "width": "350",
                                "height": "240",
                                "dataFormat": "json",
                                "dataSource":  {
                                    "chart": {
                                        "caption": "Total Buy",
                                        "subCaption": "Ajuma's SuperMart",
                                        "xAxisName": "Item",
                                        "yAxisName": "Price (In KRW)",
                                        "theme": "fint"
                                    },
                                    "data": tempe
                                }
                            });
                            revenueChart.render();

                            var revenueChart = new FusionCharts({
                                "type": "line",
                                "renderAt": "chartContainer2",
                                "width": "350",
                                "height": "240",
                                "dataFormat": "json",
                                "dataSource":  {
                                    "chart": {
                                        "caption": "Total Sales",
                                        "subCaption": "Ajuma's SuperMart",
                                        "xAxisName": "Item",
                                        "yAxisName": "Price (In KRW)",
                                        "theme": "fint"
                                    },
                                    "data": tempe1
                                }
                            });
                            revenueChart.render();

                            var revenueChart = new FusionCharts({
                                "type": "line",
                                "renderAt": "chartContainer3",
                                "width": "350",
                                "height": "240",
                                "dataFormat": "json",
                                "dataSource":  {
                                    "chart": {
                                        "caption": "Total Profit",
                                        "subCaption": "Ajuma's SuperMart",
                                        "xAxisName": "Item",
                                        "yAxisName": "Price (In KRW)",
                                        "theme": "fint"
                                    },
                                    "data": tempe2
                                }
                            });
                            revenueChart.render();

                            var revenueChart = new FusionCharts({
                                "type": "pie3d",
                                "renderAt": "chartContainer4",
                                "width": "600",
                                "height": "400",
                                "dataFormat": "json",
                                "dataSource":  {
                                    "chart": {
                                        "caption": "Data Item Sales",
                                        "subCaption": "Ajuma's SuperMart",
                                        "xAxisName": "Item",
                                        "yAxisName": "Price (In KRW)",
                                        "theme": "fint"
                                    },
                                    "data": tempe3
                                }
                            });
                            revenueChart.render();

                            var revenueChart = new FusionCharts({
                                "type": "pie3d",
                                "renderAt": "chartContainer5",
                                "width": "600",
                                "height": "400",
                                "dataFormat": "json",
                                "dataSource":  {
                                    "chart": {
                                        "caption": "Data Item Buy",
                                        "subCaption": "Ajuma's SuperMart",
                                        "xAxisName": "Item",
                                        "yAxisName": "Price (In KRW)",
                                        "theme": "fint"
                                    },
                                    "data": tempe4
                                }
                            });
                            revenueChart.render();
                        })
                    })
                    .error(function(data,status,headers,config){
                        console.log(status);
                    });


        }


    };





    $scope.signout = function(){
        $cookieStore.remove('username');
        $cookieStore.remove('token');
        window.location="index.html";

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
