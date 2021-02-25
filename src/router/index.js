import Vue from "vue";
import Router from "vue-router";
import Middleware, { middleware } from "vue-router-middleware";
import { isAuthenticated } from '@/helpers/functions';

//Routes
import home from "@/router/home";
import collection from "@/router/collection";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    ...home,
    ...collection,
    // ...middleware("guest", [
    //
    // ]),
    // ...middleware("auth", [
    //
    // ]),
  ]
});

// Vue.use(Middleware, {
//   router,
//   middlewares: {
//     guest(params, to, from, next) {
//       if (isAuthenticated()) {
//         next({ name: "dashboard" });
//       } else {
//         next();
//       }
//     },
//     auth(params, to, from, next) {
//       if (isAuthenticated()) {
//         next();
//       } else {
//         next({ name: "login" });
//       }
//     }
//   }
// });

export default router;
