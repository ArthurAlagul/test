import {
  range,
  absolute,
  isAuthenticated,
  redirectTo,
  getCurrentUrl,
  isEmpty,
  getKeyByValue,
  findByAttribute,
  findIndexByAttribute,
  whereInByAttribute,
  getTimezone,
  ip,
} from '@/helpers/functions';

export default {
  methods: {
    /**
     *
     * @param href
     */
    $redirectTo(href) {
      redirectTo(href);
    },

    /**
     *
     * @returns {string}
     */
    $getCurrentUrl() {
      return getCurrentUrl();
    },

    /**
     *
     * @param route
     */
    $toRoute(route) {
      if (this.$route.name === route.name &&
        JSON.stringify(this.$route.params) === JSON.stringify(route.params)) {
        return false;
      }

      this.$router.push(route);
    },

    /**
     *
     * @param obj
     * @returns {boolean}
     */
    $isEmpty(obj) {
      return isEmpty(obj);
    },

    /**
     *
     * @param object
     * @param value
     * @returns {string | undefined}
     */
    $getKeyByValue(object, value) {
      return getKeyByValue(object, value);
    },

    /**
     *
     * @param array
     * @param attribute
     * @param value
     */
    $findByAttribute(array, attribute, value) {
      return findByAttribute(array, attribute, value);
    },

    /**
     *
     * @param array
     * @param attribute
     * @param value
     */
    $findIndexByAttribute(array, attribute, value) {
      return findIndexByAttribute(array, attribute, value);
    },

    /**
     *
     * @param array
     * @param attribute
     * @param value
     */
    $whereInByAttribute(array, attribute, value) {
      return whereInByAttribute(array, attribute, value);
    },

    /**
     * @returns {boolean}
     */
    $isAuthenticated() {
      return isAuthenticated();
    },

    /**
     * @param count
     * @returns {Array}
     */
    $range(count) {
      return range(count);
    },

    /**
     * @param number
     * @returns {*}
     */
    $absolute(number) {
      return absolute(number);
    },

    /**
     * @returns {*}
     */
    $timezone() {
      return getTimezone();
    },

    /**
     * @param callback
     * @returns {*}
     */
    $ip(callback) {
      return ip(callback);
    },
  }
};
