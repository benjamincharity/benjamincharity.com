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


        const stateChangeStart = this.$rootScope.$on('$stateChangeStart', (event, toState) => {
            this._handleStateChange.call(this, event, toState);
        });

    }


    /**
     * Perform tasks on each state change
     *
     * @param {Object} event
     * @param {Object} toState
     */
    _handleStateChange(event, toState) {
        // If no data object exists, bail out
        if (!toState.data) {
            return false;
        }

        // If a view has a header state defined
        if (typeof(toState.data.compactHeader) === 'boolean') {
            this.compactHeader = toState.data.compactHeader;
        }

        // If a view has a title
        if (toState.data.viewTitle) {
            this.title = 'Benjamin Charity - ' + toState.data.viewTitle;
        } else {
            this.title = 'Benjamin Charity';
        }
    }


}

