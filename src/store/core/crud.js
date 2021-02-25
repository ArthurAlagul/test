import ApiService from "@/services/api";

export default {
  process(options) {
    let state = {};
    let actions = {};
    let mutations = {};

    if (options.getPaginationRequest) {
      state = { ...state, getPaginationRequest: {
          loading: false,
          success: false,
          fail: false,
          collection: [],
          pagination: {
            page: 1
          },
          errors: {},
          params: {}
        },
      };
      actions = { ...actions,
        [options.getPaginationRequest.action](context, params) {
          context.state.getPaginationRequest.loading = true;
          context.state.getPaginationRequest.params = params;

          return new Promise((resolve, reject) => {
            ApiService.query(options.getPaginationRequest.endPoint, params)
              .then((response) => {
                context.commit(options.getPaginationRequest.mutationSuccess, response.data.data);
                resolve(response.data.data);
              })
              .catch(({ response }) => {
                context.commit(options.getPaginationRequest.mutationFail, response.data);
                reject(response.data);
              });
          });
        },
      };
      mutations = { ...mutations, [options.getPaginationRequest.mutationSuccess](state, data) {
          state.getPaginationRequest = {
            loading: false,
            success: true,
            fail: false,
            collection: data.collection,
            pagination: data.pagination,
            errors: {},
            params: {}
          };
        },
        [options.getPaginationRequest.mutationFail](state, data) {
          state.getPaginationRequest = {
            loading: false,
            success: false,
            fail: true,
            collection: [],
            pagination: {
              page: 1
            },
            errors: data.errors,
            params: {}
          };
        },
      };
    }
    if (options.getCollectionRequest) {
      state = { ...state, getCollectionRequest: {
          loading: false,
          success: false,
          fail: false,
          collection: [],
          errors: {},
          params: {},
        },
      };
      actions = { ...actions,
        [options.getCollectionRequest.action](context, params) {
          context.state.getCollectionRequest.loading = true;
          context.state.getCollectionRequest.params = params;

          return new Promise((resolve, reject) => {
            ApiService.query(options.getCollectionRequest.endPoint, params)
              .then((response) => {
                context.commit(options.getCollectionRequest.mutationSuccess, response.data.data);
                resolve(response.data.data);
              })
              .catch(({ response }) => {
                context.commit(options.getCollectionRequest.mutationFail, response.data);
                reject(response.data);
              });
          });
        },
      };
      mutations = { ...mutations, [options.getCollectionRequest.mutationSuccess](state, data) {
          state.getCollectionRequest = {
            loading: false,
            success: true,
            fail: false,
            collection: data.collection,
            errors: {},
            params: {},
          };
        },
        [options.getCollectionRequest.mutationFail](state, data) {
          state.getCollectionRequest = {
            loading: false,
            success: false,
            fail: true,
            collection: [],
            errors: data.errors,
            params: {},
          };
        },
      };
    }
    if (options.getSingleRequest) {
      state = { ...state, getSingleRequest: {
          loading: false,
          success: false,
          fail: false,
          item: {},
          errors: {},
          params: {},
        },
      };
      actions = { ...actions,
        [options.getSingleRequest.action](context, { id, params }) {
          context.state.getSingleRequest.loading = true;
          context.state.getSingleRequest.params = { id, ...(params || {}) };

          return new Promise((resolve, reject) => {
            ApiService.query(`${options.getSingleRequest.endPoint}/${id}`, params)
              .then((response) => {
                context.commit(options.getSingleRequest.mutationSuccess, response.data.data);
                resolve(response.data.data);
              })
              .catch(({ response }) => {
                context.commit(options.getSingleRequest.mutationFail, response.data);
                reject(response.data);
              });
          });
        },
      };
      mutations = { ...mutations, [options.getSingleRequest.mutationSuccess](state, data) {
          state.getSingleRequest = {
            loading: false,
            success: true,
            fail: false,
            item: data,
            errors: {},
            params: {},
          };
        },
        [options.getSingleRequest.mutationFail](state, data) {
          state.getSingleRequest = {
            loading: false,
            success: false,
            fail: true,
            item: {},
            errors: data.errors,
            params: {},
          };
        },
      };
    }
    if (options.creationRequest) {
      state = { ...state,  creationRequest: {
          loading: false,
          success: false,
          fail: false,
          validation: {},
          response: {},
          params: {},
        },
      };
      actions = { ...actions,
        [options.creationRequest.actionReset](context) {
          context.state.creationRequest = {
            loading: false,
            success: false,
            fail: false,
            validation: {},
            response: {},
            params: {},
          };
        },
        [options.creationRequest.action](context, params) {
          context.state.creationRequest.loading = true;
          context.state.creationRequest.params = params;

          return new Promise((resolve, reject) => {
            let method = 'post';

            if (options.creationRequest.isUpload) {
              method = 'postUpload';
            }

            ApiService[method](options.creationRequest.endPoint, params)
              .then(response => {
                context.commit(options.creationRequest.mutationSuccess, response.data.data);
                resolve(response.data.data);
              })
              .catch(({ response }) => {
                context.commit(options.creationRequest.mutationFail, response.data);
                reject(response.data);
              });
          });
        },
      };
      mutations = { ...mutations, [options.creationRequest.mutationSuccess](state, data) {
          state.creationRequest = {
            loading: false,
            success: true,
            fail: false,
            validation: {},
            response: data,
            params: {},
          };
        },
        [options.creationRequest.mutationFail](state, data) {
          state.creationRequest = {
            loading: false,
            success: false,
            fail: true,
            validation: data.errors,
            response: {},
            params: {},
          };
        },
      };
    }
    if (options.editingRequest) {
      state = { ...state, editingRequest: {
          loading: false,
          success: false,
          fail: false,
          validation: {},
          response: {},
          params: {},
        },
      };
      actions = { ...actions,
        [options.editingRequest.actionReset](context) {
          context.state.editingRequest = {
            loading: false,
            success: false,
            fail: false,
            validation: {},
            response: {},
            params: {},
          };
        },
        [options.editingRequest.action](context, { id, params }) {
          context.state.editingRequest.loading = true;
          context.state.editingRequest.params = { id, ...(params || {}) };

          return new Promise((resolve, reject) => {
            let method = 'put';

            if (options.editingRequest.isUpload) {
              method = 'postUpload';
              params._method = 'put';
            }

            ApiService[method](`${options.editingRequest.endPoint}/${id}`, params)
              .then(response => {
                context.commit(options.editingRequest.mutationSuccess, response.data.data);
                resolve(response.data.data);
              })
              .catch(({ response }) => {
                context.commit(options.editingRequest.mutationFail, response.data);
                reject(response.data);
              });
          });
        },
      };
      mutations = { ...mutations, [options.editingRequest.mutationSuccess](state, data) {
          state.editingRequest = {
            loading: false,
            success: true,
            fail: false,
            validation: {},
            response: data,
            params: {},
          };
        },
        [options.editingRequest.mutationFail](state, data) {
          state.editingRequest = {
            loading: false,
            success: false,
            fail: true,
            validation: data.errors,
            response: {},
            params: {},
          };
        },
      };
    }
    if (options.replaceRequest) {
      state = { ...state, replaceRequest: {
          loading: false,
          success: false,
          fail: false,
          validation: {},
          response: {},
          params: {},
        },
      };
      actions = { ...actions,
        [options.replaceRequest.actionReset](context) {
          context.state.replaceRequest = {
            loading: false,
            success: false,
            fail: false,
            validation: {},
            response: {},
            params: {},
          };
        },
        [options.replaceRequest.action](context, { id, params }) {
          context.state.replaceRequest.loading = true;
          context.state.replaceRequest.params = { id, ...(params || {}) };

          return new Promise((resolve, reject) => {
            let method = 'patch';

            if (options.replaceRequest.isUpload) {
              method = 'postUpload';
              params._method = 'patch';
            }

            ApiService[method](`${options.replaceRequest.endPoint}/${id}`, params)
              .then(response => {
                context.commit(options.replaceRequest.mutationSuccess, response.data.data);
                resolve(response.data.data);
              })
              .catch(({ response }) => {
                context.commit(options.replaceRequest.mutationFail, response.data);
                reject(response.data);
              });
          });
        },
      };
      mutations = { ...mutations, [options.replaceRequest.mutationSuccess](state, data) {
          state.replaceRequest = {
            loading: false,
            success: true,
            fail: false,
            validation: {},
            response: data,
            params: {},
          };
        },
        [options.replaceRequest.mutationFail](state, data) {
          state.replaceRequest = {
            loading: false,
            success: false,
            fail: true,
            validation: data.errors,
            response: {},
            params: {},
          };
        },
      };
    }
    if (options.deletionRequest) {
      state = { ...state, deletionRequest: {
          loading: false,
          success: false,
          fail: false,
          data: {},
          errors: {},
          params: {},
        }
      };
      actions = { ...actions,
        [options.deletionRequest.action](context, { id }) {
          context.state.deletionRequest.loading = true;
          context.state.deletionRequest.params = { id };

          return new Promise((resolve, reject) => {
            ApiService.delete(`${options.deletionRequest.endPoint}/${id}`)
              .then(response => {
                context.commit(options.deletionRequest.mutationSuccess, response.data.data);
                resolve(response.data.data);
              })
              .catch(({ response }) => {
                context.commit(options.deletionRequest.mutationFail, response.data);
                reject(response.data);
              });
          });
        }
      };
      mutations = { ...mutations,  [options.deletionRequest.mutationSuccess](state, data) {
          state.deletionRequest = {
            loading: false,
            success: true,
            fail: false,
            data: data,
            errors: {},
            params: {},
          };
        },
        [options.deletionRequest.mutationFail](state, data) {
          state.deletionRequest = {
            loading: false,
            success: false,
            fail: true,
            data: {},
            errors: data.errors,
            params: {},
          };
        }
      };
    }

    return {
      state,
      actions,
      mutations
    };
  }
};
