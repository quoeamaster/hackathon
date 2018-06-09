import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// module definitions
// QPong template form values
let modTemplate = {
  namespaced: true,
  state: {
    title: '',
    subtitle: '',
    description: ''
  },
  mutations: {
    // method to update the template info related values back to state.template object
    setTemplateInfo (state, model) {
      state.title = model['title']
      state.subtitle = model['subtitle']
      state.description = model['description']
    }
  }
}

export default new Vuex.Store({
  // define the modules
  modules: {
    template: modTemplate
  }
})
