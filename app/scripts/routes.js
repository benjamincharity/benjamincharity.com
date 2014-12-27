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
      controller: 'AppCtrl'
    })

    //
    // Projects
    .state('projects', {
      url: '/projects',
      templateUrl: '/partials/projects.html',
      controller: 'ProjectsCtrl'
    })

    //
    // About
    .state('about', {
      url: '/about',
      templateUrl: '/partials/about.html',
      controller: 'AboutCtrl'
    })

    //
    // Contact
    .state('contact', {
      url: '/contact',
      templateUrl: '/partials/contact.html',
      controller: 'ContactCtrl'
    })

    ;
});
