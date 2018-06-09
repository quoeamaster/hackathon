// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router'
import DataStore from './services/dataStore'

// import css (bootstrap, mdbootstrap)
// ** import '../build/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbootstrap/css/mdb.min.css'
import 'font-awesome/css/font-awesome.min.css'

// ** import javascript library
import 'jquery/dist/jquery.js'

// add services to the window object
import JQueryService from './services/JQueryService.vue'
import IdGenerator from './services/idGenerator'

window.JQueryService = JQueryService
window.DataStore = DataStore
window.IdGenerator = IdGenerator
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  components: { App },
  template: '<App/>'
})
