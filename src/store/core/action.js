import ApiService from "@/services/api";

export default {
  process(options) {
    let state = {
      [options.name]: {
        loading: false,
        success: false,
        fail: false,
        data: {},
        errors: {},
        params: {}
      }
    };

    let actions = {
      [options.action](context, params) {
        context.state[options.name].loading = true;
        let endPoint = options.endPoint;

        return new Promise((resolve, reject) => {
          const method = options.method || 'query';

          if (typeof params === 'object' && params) {
            for (let param in params) {
              endPoint = endPoint.replace(`{${param}}`, params[param]);
            }
          }

          params = params ? params : {};

          if (options.params) {
            params = { ...params, ...options.params};
          }

          context.state[options.name].params = params;

          ApiService[method](endPoint, params)
            .then(response => {
              context.commit(options.mutations.success, response.data);
              resolve(response.data.data);
            })
            .catch(({ response }) => {
              context.commit(options.mutations.fail, response.data);
              reject(response.data);
            });
        });
      }
    };

    if (options.actionReset) {
      actions = {
        ...actions,
        [options.actionReset](context) {
          context.state[options.name] = {
            loading: false,
            success: false,
            fail: false,
            data: {},
            errors: {},
            params: {}
          };
        },
      }
    }

    let mutations = {
      [options.mutations.success](state, data) {
        if (typeof options.mutations.successCallback === 'function') {
          options.mutations.successCallback(state, data);
        } else {
          state[options.name] = {
            loading: false,
            success: true,
            fail: false,
            data: data,
            errors: {},
            params: {}
          };
        }
      },
      [options.mutations.fail](state, data) {
        if (typeof options.mutations.errorCallback === 'function') {
          options.mutations.errorCallback(state, data.errors);
        } else {
          state[options.name] = {
            loading: false,
            success: false,
            fail: true,
            data: {},
            errors: data.errors,
            params: {}
          };
        }
      },
    };

    return {
      state,
      actions,
      mutations
    };
  },
  processMultiple(options) {
    let state = {};
    let actions = {};
    let mutations = {};

    options.map((option) => {
      const processed = this.process(option);

      state = {...state, ...processed.state};
      actions = {...actions, ...processed.actions};
      mutations = {...mutations, ...processed.mutations};
    });

    return {
      state,
      actions,
      mutations
    }
  }
}
