angular.module('bc')
.directive('setBackgroundImage', ['$timeout', '$rootScope',
  function($timeout, $rootScope) {
    return {

      link: function(scope, element, attrs) {

        // array of the current images we want to choose from
        var images = [
          'beach',
          'bikes',
          'empire',
          'espresso',
          'espresso2',
          'heart',
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
          'windowwasher'
        ];

        // get a random image number from our array
        var imageName = images[Math.floor(Math.random()*images.length)];

        // set the jpg as our background
        element.css(
          { 'background-image': 'url(/images/bg/' + imageName + '.jpg)' }
        );

        // preload the gif
        var bgImg = new Image();
        bgImg.src = '/images/bg/' + imageName + '.gif';

        // preload the texture
        var texture = new Image();
        texture.src = '/images/texture.png';

        // once the texture is loaded, add the texture and gif to the body
        texture.onload = function() {
          //$timeout(function() {
            element.css(
              { 'background-image': 'url(/images/texture.png), url(/images/bg/' + imageName + '.gif), url(images/bg/' + imageName + '.jpg)' }
            )
          //}, 2000);
          //$timeout(function() {
            element.addClass('is_active');
            scope.$apply(function () {
              $rootScope.loaderIsVisible = false;
            });
          //}, 3000);
        }


      }

    }
  }
]);
