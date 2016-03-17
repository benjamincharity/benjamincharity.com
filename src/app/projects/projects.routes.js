export function ProjectsRouterConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('projects', {
            url: '/projects',
            templateUrl: 'app/projects/projects.html',
            controller: 'ProjectsController as vm',
            data: {
                pageTitle: 'Projects',
            },
        })
    ;

}

