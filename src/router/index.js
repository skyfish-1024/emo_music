import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: {
      path: "/recommend",
    },
    component: HomeView,
    children: [
      {
        path: "/recommend",
        name: "recommend",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/Recommend.vue"),
      },
      {
        path: "/songListDetail",
        name: "songListDetail",
        component: () => import("../views/SongListDetail.vue"),
      },
      {
        path: "/edit",
        name: "edit",
        component: () => import("../views/EditUserInfo.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
// router.beforeEach((to, from, next) => {
//   if (to.fullPath == from.fullPath) {
//     // next();
//     return;
//   }
//   // if (to.meta.title) {
//   //   document.title = to.meta.title;
//   // }
//   next();
// });
export default router;
