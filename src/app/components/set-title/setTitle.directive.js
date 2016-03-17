export function SetTitleDirective(
    $rootScope
) {
    'ngInject';

    const directive = {
        restrict: 'A',
        link: linkFunction,
    };

    return directive;


    /**
     * Link
     */
    function linkFunction(scope, element) {

        const listner = $rootScope.$on('$stateChangeStart', (event, toState) => {
            let title = 'Benjamin Charity';

            if (toState.data && toState.data.pageTitle) {
                title = title + ' - ' + toState.data.pageTitle;
            }

            element.text(title);
        });

    }

}

