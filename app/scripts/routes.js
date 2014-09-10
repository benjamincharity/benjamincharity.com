angular.module('bc').config(function($stateProvider, $urlRouterProvider) {

  //
  // For any unmatched url, redirect to '/'
  $urlRouterProvider.otherwise('/');

  //
  // Now set up the states
  $stateProvider

    //
    // Home
    //
    .state('landing', {
      url: "/",
      //abstract: true,
      templateUrl: "/partials/landing.html",
      controller: "AppCtrl"
    })

    //
    // Projects
    //
    .state('landing.projects', {
      url: "projects",
      templateUrl: "/partials/projects.html",
      controller: "ProjectsCtrl"
    })

    //
    // About
    //
    .state('landing.about', {
      url: "about",
      templateUrl: "/partials/about.html",
      controller: "AboutCtrl"
    })

    //
    // Contact
    //
    .state('landing.contact', {
      url: "contact",
      templateUrl: "/partials/contact.html",
      controller: "ContactCtrl"
    })



    ;
});
