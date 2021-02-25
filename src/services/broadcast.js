import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { env } from '@/config/.env';
import SessionService from '@/services/session';

export default class BroadcastService {
  /**
   *
   */
  constructor() {
    if (!env.OPTIONS.broadcast) {
      return;
    }

    const token = SessionService.get('token');

    if (!env.OPTIONS.broadcast) {
      return;
    }

    this.broadcaster = new Echo({
      broadcaster: 'pusher',
      key: env.PUSHER_APP_KEY,
      cluster: env.PUSHER_CLUSTER,
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      auth: {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
      encrypted: true
    });
  }

  /**
   * Leave channel
   *
   * @param channel
   */
  static leave(channel) {
    if (!env.OPTIONS.broadcast) {
      return;
    }

    const instance = new BroadcastService();
    instance.broadcaster.leave(channel);
  }

  /**
   * Listen to channel
   *
   * @param channel
   * @param event
   * @param callback
   */
  static listen(channel, event, callback) {
    if (!env.OPTIONS.broadcast) {
      return;
    }

    const instance = new BroadcastService();
    instance.broadcaster.channel(channel)
      .listen(event, (e) => {
        callback(e);
      });
  }

  /**
   * Listen to private channel
   *
   * @param channel
   * @param event
   * @param callback
   */
  static listenPrivate(channel, event, callback) {
    if (!env.OPTIONS.broadcast) {
      return;
    }

    const instance = new BroadcastService();
    instance.broadcaster.private(channel)
      .listen(event, (e) => {
        callback(e);
      });
  }
};
