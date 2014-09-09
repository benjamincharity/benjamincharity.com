angular.module('bc')
.directive('setBackgroundImage', ['$timeout',
  function($timeout) {
    return {

      link: function(scope, element, attrs) {

        var images = [1, 2];

        var isNotMobile = !Modernizr.touch;

        // get a random image number from our array
        var imageNumber = images[Math.floor(Math.random()*images.length)];

        // set the jpg as our background
        element.css(
          { 'background-image': 'url(images/bg/' + imageNumber + '.jpg)' }
        );

        // if we are not on a mobile device, preload the gif
        if( isNotMobile ) {
          // create a new image for the gif
          var img = new Image();

          // build the url and assign to the new image to begin preloading
          img.src = 'images/bg/' + imageNumber + '.gif';

          img.onload = function() {
            element.css(
              { 'background-image': 'url(images/bg/' + imageNumber + '.gif), url(images/bg/' + imageNumber + '.jpg)' }
            );
          }
        }


      }

    }
  }
]);
