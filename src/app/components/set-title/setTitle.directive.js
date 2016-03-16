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

        var listener = function(event, toState) {
            var title = 'Benjamin Charity';

            if (toState.data && toState.data.pageTitle) {
                title = title + ' - ' + toState.data.pageTitle;
            }

            element.text(title);
        };

        $rootScope.$on('$stateChangeStart', listener);
    }

}

