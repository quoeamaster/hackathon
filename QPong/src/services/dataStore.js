import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // QPong template form values
    template: {
      title: '',
      subtitle: '',
      description: ''
    }
  },
  mutations: {
    // method to update the template info related values back to state.template object
    setTemplateInfo (state, model) {
      state.template.title = model['title']
      state.template.subtitle = model['subtitle']
      state.template.description = model['description']
    }
  }
})
