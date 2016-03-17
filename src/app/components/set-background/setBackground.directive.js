import { BACKGROUNDS } from './background.constant';

export function SetBackgroundDirective(
    $timeout, $rootScope
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
    function linkFunction($scope, $element) {

        // Array of the current images we want to choose from
        const imageNames = BACKGROUNDS;

        // Get a random image from the array
        const imageName = imageNames[Math.floor(Math.random()*imageNames.length)];

        // Set the jpg as our background
        $element.css(
            {
                'background-image': 'url(assets/images/bg/' + imageName + '.jpg)',
            }
        );

        // Preload the gif
        const gif = new Image();
        gif.src = 'assets/images/bg/' + imageName + '.gif';

        // Preload the texture
        const texture = new Image();
        texture.src = 'assets/images/texture.png';

        // Once the texture is loaded
        texture.onload = () => {
            // Add the texture and gif to the element
            $element.css(
                {
                    'background-image': 'url(assets/images/texture.png), url(assets/images/bg/' +
                        imageName +'.gif),url(assets/images/bg/' + imageName + '.jpg)',
                }
            );

            $element.addClass('is_active');

            $scope.$apply(() => {
                $rootScope.loaderIsVisible = false;
            });
        };


    }

}

