export function PreloadDirective() {

    const directive = {
        replace: true,
        scope: {
            array: '=',
        },
        link: linkFunction,
    };

    return directive;




    function linkFunction($scope) {

        $scope.$watch('array', function(newValue) {

            if (newValue && newValue.length > 0) {

                _.forEach($scope.array, function(object) {

                    // Create a new image
                    const image = new Image();

                    // Set the source
                    image.src = object.image;

                });

            }
        });


    }

}

