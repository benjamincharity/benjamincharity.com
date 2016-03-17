import { PreloadController } from './preload.controller';

export function PreloadDirective() {

    const directive = {
        restrict: 'E',
        replace: true,
        scope: {},
        bindToController: {
            images: '=',
        },
        controller: PreloadController,
        controllerAs: 'vm',
    };

    return directive;

}

