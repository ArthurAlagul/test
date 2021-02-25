import Vue from "vue";

import helpers from "@/mixins/helpers";

const MixinsService = {
  /**
   *
   */
  init() {
    Vue.mixin(helpers);
  }
};

export default MixinsService;
