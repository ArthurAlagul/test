import SessionService from "@/services/session";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

/**
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!SessionService.get("token") || !!SessionService.get("refreshToken");
};

/**
 *
 * @param href
 */
export const redirectTo = (href) => {
  window.location.href = href;
};

/**
 *
 * @returns {string}
 */
export const getCurrentUrl = () => {
  return window.location.href;
};

/**
 *
 * @param obj
 * @returns {boolean}
 */
export const isEmpty = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
};

/**
 *
 * @param object
 * @param value
 * @returns {string | undefined}
 */
export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};

/**
 *
 * @param array
 * @param attribute
 * @param value
 */
export const findByAttribute = (array, attribute, value) => {
  return array.find(item => item[attribute] === value);
};

/**
 *
 * @param array
 * @param attribute
 * @param value
 */
export const findIndexByAttribute = (array, attribute, value) => {
  return array.findIndex(item => item[attribute] === value);
};

/**
 *
 * @param array
 * @param attribute
 * @param value
 */
export const whereInByAttribute = (array, attribute, value) => {
  return array.filter(item => item[attribute] === value);
};

/**
 * @param count
 * @returns {Array}
 */
export const range = (count) => {
  let range = [];

  for (let i = 0; i < count; i++) {
    range.push(i);
  }

  return range;
};

/**
 * @param number
 * @returns {*}
 */
export const absolute = (number) => {
  if (number === 0) {
    return 0;
  }
  if (!number) {
    return number;
  }

  return Math.abs(number);
};

/**
 * @returns {string}
 */
export const getTimezone = () => {
  return new window.Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * @param callback
 */
export const ip = (callback) => {
  fetch('https://api.ipify.org?format=json')
    .then(x => x.json())
    .then(({ ip }) => {
      callback(ip);
    });
};
