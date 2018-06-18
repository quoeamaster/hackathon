import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// module definitions
// QPong template form values
let modTemplate = {
  namespaced: true,
  state: {
    // the project-id (if any)
    projectId: '',

    // info view related field(s)
    title: '',
    subtitle: '',
    description: '',

    /*
     *  background picker view related field(s)
     *  categoryId => id for the parent category
     *  image => img url picked
     */
    pickedImageList: [],
    /*
     *  id => category id
     *  title => caption for this category
     *  image => background image for this category
     */
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
    },
    // set the project-id
    setProjectId (state, model) {
      state.projectId = model['projectId']
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
    },
    /**
     * return the data-model all in 1
     * @param state
     * @returns {{projectId: *, title: *, subtitle: *, description: *, pickedImageList: *, pickedCategoryList: *}}
     */
    dataModel: function (state) {
      return {
        projectId: state.projectId,
        title: state.title,
        subtitle: state.subtitle,
        description: state.description,
        pickedImageList: state.pickedImageList,
        pickedCategoryList: state.pickedCategoryList
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
