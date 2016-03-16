import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

import './components/set-title/';
import './components/set-background/';
import './components/preload/';
import { ApplicationController } from './application/application.controller';

angular.module('bc', [
    'ngAnimate',
    'ui.router',

    'bc.SetTitle',
    'bc.SetBackground',
    'bc.Preload',
])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('ApplicationController', ApplicationController)
;

