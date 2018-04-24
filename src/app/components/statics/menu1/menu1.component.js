import templateUrl from './menu1.html';

export const menu1Component = {
  templateUrl,
  controller: class Menu1Component {
    constructor($state) {
      'ngInject';

      this.$state = $state;
    }
  },
};