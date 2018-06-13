import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// module definitions
// QPong template form values
let modTemplate = {
  namespaced: true,
  state: {
    // info view related field(s)
    title: '',
    subtitle: '',
    description: '',
    // background picker view related field(s)
    pickedImageList: [],
    pickedCategoryList: []
  },
  mutations: {
    // method to update the template info related values back to state.template object
    setTemplateInfo (state, model) {
      state.title = model['title']
      state.subtitle = model['subtitle']
      state.description = model['description']
    },
    // method to update the picked image list[]
    setTemplateBackgroundPicker (state, model) {
      state.pickedImageList = model['pickedImageList']
      state.pickedCategoryList = model['pickedCategoryList']
    }
  },
  getters: {
    // usage => window.DataStore.getters['template/test']
    test: function (state) {
      return 'hi there'
    },
    // usage => window.DataStore.getters['template/categoryItemById'](id)
    categoryItemById: function (state) {
      return function (id) {
        if (state.pickedCategoryList) {
          for (let i = 0; i < state.pickedCategoryList.length; i++) {
            let item = state.pickedCategoryList[i]
            if (item.id === id) {
              return item
            }
          }
          return null
        }
      }
    }
  }
}

export default new Vuex.Store({
  // define the modules
  modules: {
    template: modTemplate
  }
})
