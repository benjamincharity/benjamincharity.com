export class ApplicationController {

    constructor(
        $rootScope
    ) {
        'ngInject';

        this.$rootScope = $rootScope;


        this._activate();

    }




    _activate() {
        this.title = 'Benjamin Charity';
        this.imagesToPreload = [
            'assets/images/icon-code.svg',
            'assets/images/icon-design.svg',
            'assets/images/icon-pm.svg',
            'assets/images/icon-ux.svg',
        ];


        // Toggle the logo/header size
        // TODO: Move to route data object
        const stateChangeStart = this.$rootScope.$on('$stateChangeStart', (event, toState) => {

            // If no data object exists, bail out
            if (!toState.data) {
                return false;
            }

            // If a view has a header state defined
            if (toState.data.compactHeader) {
                this.compactHeader = toState.data.compactHeader;
            }

            // If a view has a title
            if (toState.data.viewTitle) {
                this.title = 'Benjamin Charity - ' + toState.data.viewTitle;
            } else {
                this.title = 'Benjamin Charity';
            }

        });

    }


}

