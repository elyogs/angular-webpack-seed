import { navComponent } from './app-nav.component';
import './app-nav.css';

export const appNav = angular
  .module('common.app-nav', [])
  .component('appNav', navComponent)
  .name;