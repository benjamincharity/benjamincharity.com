'use strict';

angular.module('bc')
.controller('ContactCtrl', function ($scope, contentService) {

  $scope.title = 'Contact';

  contentService.contact().then(function(result) {
    $scope.contactList = result;
  });

});
