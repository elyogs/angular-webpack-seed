import templateUrl from './app-nav.html';

export const navComponent = {
  /* bindings: {
    user: '<',
    onLogout: '&',
  }, */
  templateUrl,
  controller: class NavComponent {
    constructor(/* AuthService,  */$state, $scope, $rootScope) {
      'ngInject';
      this.isNavCollapsed = true;
      console.log('nav-bar controller');

      this.$state = $state;
      this.$scope = $scope;
      this.$rootScope = $rootScope;

    }
  }
};