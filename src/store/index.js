import Vue from "vue";
import Vuex from "vuex";

import collection from './collection/reducers';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    collection
  }
});
