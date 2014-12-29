'use strict';

angular.module('bc').config(function($stateProvider, $urlRouterProvider) {

  //
  // For any unmatched url, redirect to '/'
  $urlRouterProvider.otherwise('/');

  //
  // Now set up the states
  $stateProvider

    //
    // Home
    .state('landing', {
      url: '/',
      controller: 'AppCtrl',
      data: {
        pageTitle: 'UX Engineer'
      }
    })

    //
    // Projects
    .state('projects', {
      url: '/projects',
      templateUrl: 'partials/projects.html',
      controller: 'ProjectsCtrl',
      data: {
        pageTitle: 'Projects'
      }
    })

    //
    // Contact
    .state('contact', {
      url: '/contact',
      templateUrl: 'partials/contact.html',
      controller: 'ContactCtrl',
      data: {
        pageTitle: 'Contact'
      }
    })

    ;
});
