import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Plugin from "../lib";
Plugin(VueRouter);
Vue.use(VueRouter);

//Vue.use(Plugin)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },{
    path:'/tag',
    name:'卡签',
    component: () => 
    import(/* webpackChunkName: "tag" */ "../lib/view.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


export default router;
