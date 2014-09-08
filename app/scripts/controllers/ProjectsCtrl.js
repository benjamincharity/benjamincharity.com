'use strict';

angular.module('bc')
.controller('ProjectsCtrl', function ($scope, contentService) {

  $scope.title = 'Projects';

  contentService.projects().then(function(result) {
    $scope.projects = result;
  });

});
