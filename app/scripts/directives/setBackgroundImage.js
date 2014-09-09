angular.module('bc')
.directive('setBackgroundImage', ['$timeout',
  function($timeout) {
    return {

      link: function(scope, element, attrs) {

        // array of the current images we want to choose from
        var images = [1, 2];

        // get a random image number from our array
        var imageNumber = images[Math.floor(Math.random()*images.length)];

        // set the jpg as our background
        element.css(
          { 'background-image': 'url(/images/bg/' + imageNumber + '.jpg)' }
        );

        // preload the gif
        var bgImg = new Image();
        bgImg.src = '/images/bg/' + imageNumber + '.gif';

        // preload the texture
        var texture = new Image();
        texture.src = '/images/texture.png';

        // once the texture is loaded, add the texture and gif to the body
        texture.onload = function() {
          $timeout(function() {
            element.css(
              { 'background-image': 'url(/images/texture.png), url(/images/bg/' + imageNumber + '.gif), url(images/bg/' + imageNumber + '.jpg)' }
            )
          }, 2000);
          $timeout(function() {
            element.addClass('is_active');
          }, 3000);
        }


      }

    }
  }
]);
