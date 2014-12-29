'use strict';

angular.module('bc').directive('setWindowTitle',
function($rootScope) {

  return {
    restrict: 'A',
    link: function(scope, element) {

      var listener = function(event, toState) {
        var title = 'Benjamin Charity';

        if (toState.data && toState.data.pageTitle) {
          title = title + ' - ' + toState.data.pageTitle;
        }

        element.text(title);
      };

      $rootScope.$on('$stateChangeStart', listener);
    }
  };

});

