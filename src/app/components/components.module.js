import { statics } from './statics/statics.module';

export const components = angular
  .module('components', [
    statics
  ])
  .name;