import action from "@/store/core/action";

import {
  GET_COLLECTION,
  GET_COLLECTION_SUCCESS,
  GET_COLLECTION_FAIL,
  CHANGE_SINGLE_VALUE,
} from "./actions";

const actionsProcessed = action.processMultiple([
  {
    name: 'getCollectionRequest',
    action: GET_COLLECTION,
    endPoint: 'fixtures/mock.json',
    mutations: {
      fail: GET_COLLECTION_FAIL,
      success: GET_COLLECTION_SUCCESS,
    },
  },
]);

const getters = {};

const state = {
  ...actionsProcessed.state,
};

const actions = {
  ...actionsProcessed.actions,
};

const mutations = {
  [CHANGE_SINGLE_VALUE] (state, id) {
    state.getCollectionRequest.data.blocks.map((block) => {
      if (id === block.id) {
        block.value = 100;
      }
    });
  },
  ...actionsProcessed.mutations,
};

export default {
  state,
  actions,
  mutations,
  getters
};
