export class ProjectsController {

    constructor(
        $scope,
        ContentService
    ) {
        'ngInject';

        ContentService.projects().then(function(result) {
            $scope.projects = result;
        });

        this._activate();

    }




    _activate() {

    }

}

