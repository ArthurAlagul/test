import Vue from "vue";
import VueMoment from 'vue-moment';
import moment from 'moment';

const LibrariesService = {
  /**
   *
   */
  init() {
    this.initVueMoment();
  },

  /**
   *
   */
  initVueMoment() {
    Vue.use(VueMoment, {
      moment
    })
  },
};

export default LibrariesService;
