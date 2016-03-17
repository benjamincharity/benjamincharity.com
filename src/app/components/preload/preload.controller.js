export class PreloadController {

    constructor(
    ) {
        'ngInject';


        this._activate();

    }




    _activate() {
        this._preloadImages(this.images);
    }


    /**
     * Preload images
     *
     * @param {Array} images
     */
    _preloadImages(images) {
        _.forEach(images, (src) => {

            // Create a new image
            const image = new Image();

            // Set the source
            image.src = src;

        });
    }


}

