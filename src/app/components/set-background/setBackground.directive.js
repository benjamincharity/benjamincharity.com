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
    function linkFunction(scope, element) {

        // array of the current images we want to choose from
        const images = [
            'beach',
            'bikes',
            'empire',
            'espresso',
            'espresso2',

            /*
             *'heart',
             */
            'hotdog',
            'lantern',
            'lightstring',
            'newspaper',
            'paris',
            'reading',
            'roundabout',
            'scad',
            'seagulls',
            'subway',
            'subway2',
            'theatre',
            'windowwasher',
        ];

        // get a random image number from our array
        const imageName = images[Math.floor(Math.random()*images.length)];

        // set the jpg as our background
        element.css(
            {
                'background-image': 'url(assets/images/bg/' + imageName + '.jpg)',
            }
        );

        // preload the gif
        const bgImg = new Image();
        bgImg.src = 'assets/images/bg/' + imageName + '.gif';

        // preload the texture
        const texture = new Image();
        texture.src = 'assets/images/texture.png';

        // once the texture is loaded, add the texture and gif to the body
        texture.onload = () => {
            element.css(
                {
                    'background-image': 'url(assets/images/texture.png), url(assets/images/bg/' +
                        imageName +'.gif),url(assets/images/bg/' + imageName + '.jpg)',
                }
            );

            element.addClass('is_active');

            scope.$apply(() => {
                $rootScope.loaderIsVisible = false;
            });
        };


    }

}
