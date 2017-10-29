var app = angular.module("MyApp", []);

app.controller("weatherCtrl", function($scope, $http) {

  var awaitingInfo;

  if ($scope.search === undefined) {
    $scope.search = "California";
    getData();
  }

  $scope.change = function() {
    if (awaitingInfo) {
      clearTimeout(awaitingInfo);
    }
    awaitingInfo = setTimeout(getData, 800);
  };

  function getData() {
    var url = 'https://query.yahooapis.com/v1/public/yql?' + 'q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20' + '(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + $scope.search + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

    $http.get(url).
    success(function(data, status, headers, config) {
      $scope.Datas = data.query.results.channel;
      $scope.currentTemp = $scope.Datas.item.condition.temp;
    }).
    error(function(data, status, headers, config) {
      //log error
    });
  }
});