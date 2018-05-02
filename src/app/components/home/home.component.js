import templateUrl from './home.html';

export const homeComponent = {
  templateUrl,
  controller: class HomeComponent {
    constructor($state) {
      'ngInject';

      this.$state = $state;
    }
  },
};