import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/bands',
    name: 'Bands',
    component: () => import(/* webpackChunkName: "about" */ '../views/Bands.vue')
  },
  {
    path: '/artists/add',
    name: 'Add artist page',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddBand.vue')
  },
  {
    path: '/bands/:title',
    name: 'Band page',
    component: () => import(/* webpackChunkName: "about" */ '../views/BandInfo.vue')
  },
  {
    path: '/bands/:title/:album',
    name: 'Album page',
    component: () => import(/* webpackChunkName: "about" */ '../views/AlbumInfo.vue')
  }
]

const router = new VueRouter({
  routes
});

export default router;
