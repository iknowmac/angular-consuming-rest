(function(){

  const app = angular.module('appRESTful', ['ngRoute']);
  const root = 'http://jsonplaceholder.typicode.com';

  app.config(function($routeProvider) {
    $routeProvider
      .when("/posts/:id", {templateUrl : 'views/post.html', controller: 'postCtrl'})
      .when("/posts", {templateUrl: 'views/posts.html', controller: 'postsCtrl'})
      .when("/", {templateUrl : 'views/main.html'})
      .otherwise({redirectTo: '/'});
  });

  app.controller("postsCtrl", function($scope, $http) {
    $http({
      method: 'GET',
      url: `${root}/posts`
    })
      .then(function successCallback(response) {
        var posts = response.data.slice(0, 20);
        $scope.postsLength = `${posts.length} Posts`;
        $scope.posts = posts;
      }, function errorCallback(response) {
        console.log({status: response.statusText});
      });
  });

  app.controller("postCtrl", function($scope, $routeParams, $http) {
    var id = $routeParams.id;
    $http({
      method: 'GET',
      url: `${root}/posts/${id}`
    })
      .then(function successCallback(response) {
        $scope.post = response.data;
      }, function errorCallback(response) {
        console.log({status: response.statusText});
      });
  });

})();
