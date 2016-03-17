/* global FastClick */
export function runBlock(
    $rootScope, $document
) {
    'ngInject';

    $rootScope.loaderIsVisible = true;




    // Toggle the logo/header size
    // TODO: Move to route data object
    const stateChangeStart = $rootScope.$on('$stateChangeStart', (event, toState) => {

        if (toState.name === 'home') {
            $rootScope.compactHeader = false;
        } else {
            $rootScope.compactHeader = true;
        }

    });


    // Initialize FastClick.js
    FastClick.attach($document[0].body);

}

