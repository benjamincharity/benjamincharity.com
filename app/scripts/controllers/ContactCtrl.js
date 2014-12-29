'use strict';

angular.module('bc')
.controller('ContactCtrl', function ($scope, ContentService) {

  $scope.title = 'Contact';

  ContentService.contact().then(function(result) {
    $scope.contactList = result;
  });

});
