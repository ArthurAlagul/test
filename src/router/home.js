export default [
  {
    name: "home",
    path: "/home",
    component: () => import(/*webpackChunkName: "home" */ "@/pages/home/Index"),
    meta: {}
  }
];
