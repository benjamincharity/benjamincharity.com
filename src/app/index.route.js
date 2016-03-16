export function routerConfig(
    $urlRouterProvider,
    $locationProvider
) {
    'ngInject';

    // Default route
    $urlRouterProvider.otherwise('/');

    // Pretty URLs
    $locationProvider.html5Mode(true);

}
