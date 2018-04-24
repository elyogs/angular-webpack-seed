import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';
import uiBootstrap from 'angular-ui-bootstrap';

import { rootComponent } from './root.component';
import { common } from './common/common.module';
import { components } from './components/components.module';

import '../public/css/bootstrap.min.css';
import '../public/css/bootstrap-theme.min.css';
import './root.css';

console.log('exporting root');

export const root = angular
  .module('root', [
    ngAnimate,
    ngTouch,
    uiBootstrap,
    uiRouter,
    common,
    components,
  ])
  .component('root', rootComponent)
  .config(($locationProvider) => {
    'ngInject';

    $locationProvider.html5Mode(false);
  }).name;