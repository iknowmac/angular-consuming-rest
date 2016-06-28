(function(){

  const app = angular.module('appRESTful', ['ngRoute', 'ngResource']);
  const root = 'http://jsonplaceholder.typicode.com';

  app.config(function($routeProvider) {
    $routeProvider
      .when("/posts/:id", {templateUrl : 'views/post.html', controller: 'postCtrl'})
      .when("/posts", {templateUrl: 'views/posts.html', controller: 'postsCtrl'})
      .when("/", {templateUrl : 'views/main.html'})
      .otherwise({redirectTo: '/'});
  });

  app.factory('Post', function($resource) {
    return $resource('http://jsonplaceholder.typicode.com/posts/:id', {id: '@id'});
  });

  app.controller("postsCtrl", function($scope, Post) {
    Post.query(function(data) {
      var posts = data.slice(0, 20);
      $scope.postsLength = `${posts.length} Posts`;
      $scope.posts = posts;
    });
  });

  app.controller("postCtrl", function($scope, $routeParams, Post) {
    var id = $routeParams.id;
    Post.get({ id: id }, function(data) {
      $scope.post = data;
    });
  });

})();
