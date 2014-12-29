'use strict';

angular.module('bc')
.controller('ProjectsCtrl', function ($scope, ContentService) {

  $scope.title = 'Projects';

  ContentService.projects().then(function(result) {
    $scope.projects = result;
  });

});
