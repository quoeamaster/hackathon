import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import TestingVue from '@/components/testing/Testing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TestingVue',
      component: TestingVue
    }
  ]
})
