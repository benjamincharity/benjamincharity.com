export class ApplicationController {

    constructor(
    ) {
        'ngInject';


        this._activate();

    }




    _activate() {
        this.imagesToPreload = [
            'assets/images/icon-code.svg',
            'assets/images/icon-design.svg',
            'assets/images/icon-pm.svg',
            'assets/images/icon-ux.svg',
        ];

    }

}

