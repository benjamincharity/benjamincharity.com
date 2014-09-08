'use strict';

angular.module('bc')
.controller('AboutCtrl', function ($scope, contentService) {

  $scope.title = 'About';

  contentService.about().then(function(result) {
    $scope.about = result;
  });

});
