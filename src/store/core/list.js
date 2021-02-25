import ApiService from "@/services/api";

export default {
  process(options) {
    const state = {
      getListRequest: {
        loading: false,
        success: false,
        fail: false,
        list: [],
        errors: {},
        params: {},
      }
    };

    const actions = {
      [options.getListRequest.action](context, params) {
        context.state.getListRequest.loading = true;
        context.state.getListRequest.params = params;

        return new Promise((resolve, reject) => {
          ApiService.query(options.getListRequest.endPoint, params)
            .then(response => {
              context.commit(options.getListRequest.mutationSuccess, response.data.data);
              resolve(response.data.data);
            })
            .catch(({ response }) => {
              context.commit(options.getListRequest.mutationFail, response.data);
              reject(response.data);
            });
        });
      }
    };

    const mutations = {
      [options.getListRequest.mutationSuccess](state, data) {
        state.getListRequest = {
          loading: false,
          success: true,
          fail: false,
          list: data.list,
          errors: {},
          params: {},
        };
      },
      [options.getListRequest.mutationFail](state, data) {
        state.getListRequest = {
          loading: false,
          success: false,
          fail: true,
          list: {},
          errors: data.errors,
          params: {},
        };
      },
    };

    return {
      state,
      actions,
      mutations
    };
  }
}
