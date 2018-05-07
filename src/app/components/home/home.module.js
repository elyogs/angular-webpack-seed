import uiRouter from '@uirouter/angularjs';
import { homeComponent } from './home.component';
import './home.css';

export const home = angular
  .module('components.statics.home', [
    uiRouter,
  ])
  .component('home', homeComponent)
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('home', {
        parent: 'app',
        url: '/home',
        component: 'home',
      });
  })
  .name;