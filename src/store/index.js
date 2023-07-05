import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import price from './modules/price';
import paperSize from './modules/paperSize';

export default new Vuex.Store({
  root: true,
  strict: true,
  modules: {
    price,
    paperSize,
  },
});
