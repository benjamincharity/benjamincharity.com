import { ProjectsRouterConfig } from './projects.routes';
import { PROJECTS } from './projects.constant';
import { ProjectsController } from './projects.controller';

angular.module('bc.projects', [])
    .config(ProjectsRouterConfig)
    .constant('PROJECTS', PROJECTS)
    .controller('ProjectsController', ProjectsController)
;

