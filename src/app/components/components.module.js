import uiRouter from '@uirouter/angularjs';
import { home } from './home/home.module';
import { menu1 } from './menu1/menu1.module';

export const components = angular
  .module('components', [
    uiRouter, 
    home,
    menu1
  ])
  .name;