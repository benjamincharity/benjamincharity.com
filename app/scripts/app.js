'use strict';

angular.module('bc', ['ngAnimate', 'ui.router'])
.run(function($rootScope) {
  $rootScope.loaderIsVisible = true;
});
