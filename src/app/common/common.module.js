import { app } from './app.module';

export const common = angular
  .module('common', [
    app,
  ]).name;