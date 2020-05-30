import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/posts',
      name: 'posts',
      component: () => import('../components/post/index.vue')
    },
    {
      path: '/add',
      name: 'post-add',
      component: () => import('../components/post/Add.vue')
    },
    {
      path: '/post/:id',
      name: 'post-detail',
      component: () => import('../components/post/Show.vue')
    }
  ]
})
