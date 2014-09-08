'use strict';

angular.module('bc')
.factory( 'contentService', function($http, $window) {

  return {

    // get all projects
    projects: function() {
      return $http({method: 'GET', url: '/scripts/json/projects.json'}).
        then(function(response, status, headers, config) {
          return response.data;
        });
    },

    // get about me content
    about: function() {
      return $http({method: 'GET', url: '/scripts/json/about.json'}).
        then(function(response, status, headers, config) {
          return response.data;
        });
    },

    // get contact info
    contact: function() {
      return $http({method: 'GET', url: '/scripts/json/contact.json'}).
        then(function(response, status, headers, config) {
          return response.data;
        });
    }

  }

});
