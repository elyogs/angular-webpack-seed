import uiRouter from '@uirouter/angularjs';
import { menu1Component } from './menu1.component';
import './menu1.css';

export const menu1 = angular
  .module('components.statics.menu1', [
    uiRouter,
  ])
  .component('menu1', menu1Component)
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('menu1', {
        parent: 'app',
        url: '/menu1',
        component: 'menu1',
      });
  })
  .name;