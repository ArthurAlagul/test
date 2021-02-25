export default [
  {
    name: "collection",
    path: "/collection",
    component: () => import(/*webpackChunkName: "collection" */ "@/pages/collection/Index"),
    meta: {}
  }
];
