import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Search from '../views/Search.vue'
import Movies from '../views/Movies.vue'
import MainItems from '../views/MainItems.vue'
import Board from '../views/Board.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'main',
    component: Main
  },{
    path: '/main',
    name: 'mainitems',
    component: MainItems
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/movies',
    name: 'movies',
    component: Movies
  },
  {
    path: '/board',
    name: 'board',
    component: Board
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
