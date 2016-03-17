export function ContactRouterConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('contact', {
            url: '/contact',
            templateUrl: 'app/contact/contact.html',
            controller: 'ContactController as vm',
            data: {
                viewTitle: 'Contact',
                compactHeader: true,
            },
        })
    ;

}

