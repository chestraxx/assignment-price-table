import Vue from 'vue';
import App from '@/App.vue';

import store from '@/store/index';

Vue.config.productionTip = false;

import {addCommas} from '@/utils/common';

Vue.mixin({
  methods: {addCommas},
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
