import { HomeRouterConfig } from './home.routes';
import { HomeController } from './home.controller';

angular.module('bc', [])
    .config(HomeRouterConfig)
    .controller('HomeController', HomeController)
;

