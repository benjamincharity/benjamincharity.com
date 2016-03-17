import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

import './components/set-title/';
import './components/set-background/';
import './components/preload/';
import './home/';
import './projects/';
import './contact/';
import { ApplicationController } from './application/application.controller';

angular.module('bc', [
    // core
    'ngAnimate',
    'ui.router',

    // components
    'bc.SetTitle',
    'bc.SetBackground',
    'bc.Preload',

    // modules
    'bc.home',
    'bc.projects',
    'bc.contact',
])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('ApplicationController', ApplicationController)
;

