import Vue from 'vue'

import App from './components/App.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(VueRouter)

import routes from './routes'
import auth from './auth'

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

// Check the user's auth status when the app starts
auth.checkAuth()

export var router = new VueRouter({
  routes: routes
});

new Vue({
  el: '#app',
  router: router,
//  store: store,
  render: h => h(App)
})

