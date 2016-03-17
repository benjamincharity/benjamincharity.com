import { HomeRouterConfig } from './home.routes';
import { HomeController } from './home.controller';

angular.module('bc.home', [])
    .config(HomeRouterConfig)
    .controller('HomeController', HomeController)
;

