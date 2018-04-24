import uiRouter from '@uirouter/angularjs';
import { appComponent } from './app.component';
import { appNav } from './app-nav/app-nav.module';
import './app.css';

export const app = angular
  .module('common.app', [
    uiRouter,
    appNav
  ])
  .component('app', appComponent)

  .config(($stateProvider,  $urlRouterProvider) => {
    'ngInject';
    $urlRouterProvider.otherwise('app');
    $stateProvider
      .state('app', {
        redirectTo: 'home',
        url: '/app',
        component: 'app',
      });
  })
  .name;