import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import { routes } from './routes'
import configFirebase from "@/services/firebase/config";
import firebase from 'firebase/app'
import 'firebase/firestore'

configFirebase()

export const db = firebase.firestore()



Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})


Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
