'use strict';

angular.module('bc', ['ngAnimate', 'ui.router'])
.run(function($rootScope) {

  $rootScope.loaderIsVisible = true;




  //////////////////////////////////////////////////
  //
  // Change the logo size when not on the landing page
  //
  //////////////////////////////////////////////////

  $rootScope.$on('$stateChangeStart',
  function(event, toState){

    if( toState.name === 'landing' ) {
      $rootScope.headerIsCompact = false;
    } else {
      $rootScope.headerIsCompact = true;
    }

  });

});
