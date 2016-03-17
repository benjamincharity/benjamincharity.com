/* global FastClick */
export function runBlock(
    $rootScope, $document
) {
    'ngInject';

    $rootScope.loaderIsVisible = true;





    // Initialize FastClick.js
    FastClick.attach($document[0].body);

}

