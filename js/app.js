var app=angular.module("app",['ngRoute']);
var urlBase="https://itwapp-cesargb504.c9users.io:8080/";
var token="";

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
            templateUrl : 'pages/publications.html',
            controller  : 'mainCtrl'
        })
        .when('/login',{
            templateUrl : 'pages/login.html',
            controller  : 'loginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
   // $locationProvider.hashPrefix('!');
});

app.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.max_id=null;
    $scope.count=10;



    $scope.update= function(){
      $http.get(urlBase+"publications").then(function (r) {
            $scope.model = r.data.data;
            $scope.max_id= $scope.model[$scope.model.length-1].id;
        });
    };
     $scope.update();
     $scope.more =function(){
       $http.get(urlBase+"publications"+"?max_id="+$scope.max_id).then(function (r) {
            $scope.model= $scope.model.concat(r.data.data);
             var asd= $scope.max_id= $scope.model[$scope.model.length-1].id;
         });
     };

}]);


app.controller('loginCtrl', ['$scope', '$http','$window', function ($scope, $http,$window) {
    $scope.user = {};
    $scope.error="";
    $scope.login =function (){
      $http({
          method  : 'POST',
          url     : urlBase+'authenticate',
          data    : $scope.user, //forms user object
          headers : {'Content-Type': 'application/json'}
    }).then(function(response) {
        token = response.data.auth_token;
        $window.location.href = '/';
    }, function (response) {
        $scope.error = response.statusText;
    });
  };
}]);
