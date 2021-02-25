import Vue from "vue";
import qs from "qs";
import axios from "axios";
import VueAxios from "vue-axios";
import {
  getTimezone
} from "@/helpers/functions";
import { env } from "@/config/.env";

const ApiService = {
  /**
   *
   */
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = env.API_URI;
  },

  /**
   *
   */
  handleRequest() {
    Vue.axios.interceptors.request.use(
      request => {
        request = this.setHeader(request, "The-Timezone-IANA", getTimezone());

        return request;
      },
      error => {
        return Promise.reject(error);
      }
    );
  },

  /**
   *
   * @param callback
   */
  handleResponse(callback) {
    Vue.axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response.status !== 422) {
          callback(error.response.status, error.response.data.message);
        }

        return Promise.reject(error);
      }
    );
  },

  /**
   *
   * @param request
   * @param header
   * @param value
   * @returns {*}
   */
  setHeader(request, header, value) {
    request.headers[header] = value;
    return request;
  },

  /**
   *
   * @param resource
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  query(resource, params) {
    return Vue.axios
      .get(resource, {
        params: params,
        paramsSerializer: function(params) {
          return qs.stringify(params, {
            arrayFormat: 'indices'
          })
        },
      });
  },

  /**
   *
   * @param resource
   * @param slug
   * @returns {Promise<AxiosResponse<any>>}
   */
  get(resource, slug = "") {
    const endPoint = slug ? `${resource}/${slug}` : `${resource}`;

    return Vue.axios.get(endPoint);
  },

  /**
   *
   * @param resource
   * @param params
   * @returns {AxiosPromise<any>}
   */
  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  /**
   *
   * @param resource
   * @param slug
   * @param params
   * @returns {AxiosPromise<any>}
   */
  update(resource, slug, params) {
    const endPoint = slug ? `${resource}/${slug}` : `${resource}`;

    return Vue.axios.put(endPoint, params);
  },

  /**
   *
   * @param resource
   * @param params
   * @returns {AxiosPromise<any>}
   */
  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  /**
   *
   * @param resource
   * @param params
   * @returns {Promise<AxiosResponse<T>>}
   */
  patch(resource, params) {
    return Vue.axios.patch(`${resource}`, params);
  },

  /**
   *
   * @param resource
   * @returns {Promise<AxiosResponse<any>>}
   */
  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  /**
   *
   * @param resource
   * @param params
   */
  postUpload(resource, params) {
    return this.post(resource, this.objectToFormData(params));
  },

  /**
   *
   * @param resource
   * @param isBlank
   */
  download(resource, isBlank) {
    const endPoint = `${env.API_URI}/${resource}`;

    if (!isBlank) {
      window.open(endPoint);
    } else {
      window.open(endPoint, '_blank');
    }
  },

  /**
   * Object to form data
   *
   * @param obj
   * @param form
   * @param namespace
   * @returns {*|FormData}
   */
  objectToFormData(obj, form, namespace) {
    let fd = form || new FormData();
    let formKey;
    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (namespace) {
          formKey = namespace + "[" + property + "]";
        } else {
          formKey = property;
        }
        if (
          typeof obj[property] === "object" &&
          !(obj[property] instanceof File)
        ) {
          this.objectToFormData(obj[property], fd, property);
        } else {
          if (obj[property] !== false) {
            fd.append(formKey, obj[property]);
          }
        }
      }
    }
    return fd;
  }
};

export default ApiService;
