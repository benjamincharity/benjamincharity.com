export function HomeRouterConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/home/home.html',
            controller: 'HomeController as vm',
            data: {
                compactHeader: false,
            },
        })
    ;

}

