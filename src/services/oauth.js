import SessionService from "@/services/session";

/**
 * Save session
 *
 * @param token
 * @param expiresAt
 * @param refreshToken
 * @param refreshExpiresAt
 * @param remember
 */
export const saveSession = ({ token, expiresAt, refreshToken, refreshExpiresAt }, remember) => {
  const options = {
    path: "/",
    expires: new Date(expiresAt * 1000)
  };

  SessionService.set("token", token, options);
  SessionService.set("tokenExpiresAt", options.expires, options);

  const rememberOptions = {
    path: "/",
    expires: new Date(refreshExpiresAt * 1000)
  };

  if (remember) {
    SessionService.set("refreshToken", refreshToken, rememberOptions);
  }
};

/**
 * Save user session
 *
 * @param data
 */
export const saveUserDataSession = data => {
  const now = new Date();
  const time = now.getTime();

  const rememberOptions = {
    path: "/",
    expires: new Date(time + 30 * 24 * 3600 * 1000)
  };

  SessionService.set("userData", {
    id: data.id,
    name: data.name,
    email: data.email,
    locale: data.locale,
  }, rememberOptions);
};

/**
 * Destroy session
 */
export const destroySession = () => {
  const options = {
    path: "/"
  };

  SessionService.remove("token", options);
  SessionService.remove("tokenExpiresAt", options);
  SessionService.remove("refreshToken", options);
  SessionService.remove("userData", options);
};

/**
 * Destroy token session
 */
export const destroyTokenSession = () => {
  const options = {
    path: "/"
  };

  SessionService.remove("token", options);
  SessionService.remove("tokenExpiresAt", options);
  SessionService.remove("refreshToken", options);
};
