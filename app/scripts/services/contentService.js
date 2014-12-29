'use strict';

angular.module('bc')
.factory( 'ContentService', function($http) {

  return {

    // get all projects
    projects: function() {
      return $http({method: 'GET', url: 'http://cdn.benjamincharity.com/v4/projects.json'}).
        then(function(response) {
          return response.data;
        });
    },

    // get contact info
    contact: function() {
      return $http({method: 'GET', url: 'http://cdn.benjamincharity.com/v4/contact.json'}).
        then(function(response) {
          return response.data;
        });
    }

  };

});
