<template>
  <div>
    <div class="t-main-label">Categories</div>
    <!-- list out the common categories -->
    <category-comp v-for="item in componentsInfo['commonCats']"
                   v-bind:instanceId="item.instanceId"
                   v-bind:id="item.id"
                   v-bind:title="item.title"
                   v-bind:image="item.image"
                   v-bind:picked="item.picked"
                   v-on:onCategoryButtonClick="handleCatBtnClick"
                   :key="item.instanceId" ></category-comp>
    <p/>
    <!-- list out the suggested categories -->
    <category-comp v-for="item in componentsInfo['suggestedCats']"
                   v-bind:instanceId="item.instanceId"
                   v-bind:id="item.id"
                   v-bind:title="item.title"
                   v-bind:image="item.image"
                   v-bind:picked="item.picked"
                   v-on:onCategoryButtonClick="handleCatBtnClick"
                   :key="item.instanceId" ></category-comp>
    <hr class="t-hr">
    <div class="t-main-label">Option List</div>
    <!-- the option list (with image / background) -->
    <category-list-comp
      v-on:onOptionImageClick="handleOptionImageClick"
      v-bind:itemList="getAllCategoryListItems()" ></category-list-comp>
    <div class="t-btn-container">
      <button class="btn btn-orange" @click="fwdToInfo($event)">back</button>
      <button class="btn btn-secondary" @click="handleSaveImgList">save</button>
      <button class="btn btn-primary" @click="fwdToPreview($event)">next</button>
    </div>
  </div>
</template>

<style>
.t-hr {
  color: lavender;
  width: 98%;
}
.t-main-label {
  font-size: 18px;
  font-family: SansSerif;
  font-style: italic;
  margin-left: 4px;
  margin-bottom: 4px;
}
.t-btn-container {
  margin-top: 40px;
}
</style>

<script>
// ** import a child component
import CategoryComp from '@/components/template/TemplateCategoryComponent'
import CategoryListComp from '@/components/template/TemplateCategoryListComponent'

function ModelTemplateBackgroundPickerView () {
  return {
    // category-component(s)' id
    componentIdList: [],
    // the category-component(s) queried for display
    componentsInfo: {},
    // the picked component(s)
    pickedComponentList: [],
    // the picked image option list
    pickedImageList: []
  }
}

export default {
  name: 'templatebackgroundpickerview',
  data: function () {
    return new ModelTemplateBackgroundPickerView()
  },
  mounted: function () {
    const ref = this
    // TODO call service to load the suitable categories from QPong server (etc); MOCKUP for now
    this.componentsInfo = {
      commonCats: [
        {
          id: '0001',
          title: 'common',
          picked: false,
          image: '/static/assets/images/category/cat_common_bkg_btn.jpg',
          instanceId: this.generateComponentId('c-b'),
          itemList: [
            { categoryId: '0001', title: 'pokemon pikachiu', picked: false, image: '/static/assets/images/category/list/cat_toy_pokemon_pikachiu_bkg.jpg', instanceId: this.generateComponentId('c-l') },
            { categoryId: '0001', title: 'Fußball', picked: false, image: '/static/assets/images/category/list/cat_sports_football_bkg.jpg', instanceId: this.generateComponentId('c-l') }
          ]
        },
        { id: '0002', title: 'popular', picked: false, image: '/static/assets/images/category/cat_popular_bkg_btn.jpg', instanceId: this.generateComponentId('c-b') }
      ],
      suggestedCats: [
        { id: '000a', title: 'clothings', picked: false, image: '/static/assets/images/category/cat_clothings_bkg_btn.jpg', instanceId: this.generateComponentId('c-b') },
        { id: '000b', title: 'beverage', picked: false, image: '/static/assets/images/category/cat_beverage_bkg_btn.jpg', instanceId: this.generateComponentId('c-b') },
        { id: '000c', title: 'cakes', picked: false, image: '/static/assets/images/category/cat_cakes_bkg_btn.jpg', instanceId: this.generateComponentId('c-b') },
        {
          id: '000d',
          title: 'toys',
          picked: false,
          image: '/static/assets/images/category/cat_toys_bkg_btn.jpg',
          instanceId: this.generateComponentId('c-b'),
          itemList: [
            { categoryId: '000d', title: 'Русская матрешка', picked: false, image: '/static/assets/images/category/list/cat_toys_russian_doll_bkg.jpg', instanceId: this.generateComponentId('c-l') },
            { categoryId: '000d', title: 'basketball fever', picked: false, image: '/static/assets/images/category/list/cat_toys_basketball_bkg.jpg', instanceId: this.generateComponentId('c-l') }
          ]
        }
      ]
    } // setting the componentsInfo (mockup for now...)

    // update the state's pickedImageList
    // TODO: handle the imageList and componentList updates on the array
    // TODO: eg. get back the comp list and image list; then iterate thru the componentsInfo queried from a "service";
    // TODO: update the corresponding item's "picked" status
    let sPickedComponentList = window.DataStore.state.template.pickedCategoryList
    let sPickedImageList = window.DataStore.state.template.pickedImageList
    console.log(sPickedImageList + '***')
    // commonCats
    window.CollectionUtil.iterateArrayForModification(this.componentsInfo.commonCats, function (itemObj) {
      let idx = window.CollectionUtil.iterateArrayForMatching(sPickedComponentList, function (curComp) {
        if (curComp.id === itemObj.id) {
          return true
        }
        return false
      }) // got the idx for the matched category
      if (idx !== -1) {
        itemObj.picked = true
        ref.pickedComponentList.push(itemObj)
      }
      // no modification => true (default)
      return true
    })
    // suggestedCats
    window.CollectionUtil.iterateArrayForModification(this.componentsInfo.suggestedCats, function (itemObj) {
      let idx = window.CollectionUtil.iterateArrayForMatching(sPickedComponentList, function (curComp) {
        if (curComp.id === itemObj.id) {
          return true
        }
        return false
      }) // got the idx for the matched category
      if (idx !== -1) {
        itemObj.picked = true
        ref.pickedComponentList.push(itemObj)
      }
      // no modification => true (default)
      return true
    })
    // TODO: handle the imageList
  },
  methods: {
    /**
     * method to generate a unique id for the component(s)
     * @param compName
     * @returns {*|string}
     */
    generateComponentId: function (compName) {
      let id = window.IdGenerator.generateComponentIdByCompName(compName)
      while (this.componentIdList.indexOf(id) !== -1) {
        id = window.IdGenerator.generateComponentIdByCompName(compName)
      }
      this.componentIdList.push(id)
      return id
    },
    _isComponentDuplicated: function (component) {
      // criteria => id match test
      let dupCnt = 0
      for (let i = 0; i < this.pickedComponentList.length; i++) {
        if (this.pickedComponentList[i].id === component.id) {
          dupCnt++
        }
      }
      if (dupCnt > 1) {
        return true
      } else {
        return false
      }
    },
    handleCatBtnClick: function (params) {
      // update the componentsInfo's picked status
      // depends on the biz logic, you might want to de-activate other components' picked status
      // check duplication of component
      const ref = this
      let component = this._getComponentByInstanceIdNCategoryId(params.instanceId, params.categoryId)
      if (component && this._isComponentDuplicated(component) === false) {
        component.picked = params.picked

        // update the pickedComponentList
        if (params.picked) {
          this.pickedComponentList.push(component)
        } else {
          // uncheck case
          let exists = window.CollectionUtil.iterateArrayForModification(this.pickedComponentList, function (itemObj, idx) {
            if (itemObj.id === component.id || itemObj.instanceId === component.instanceId) {
              if (itemObj.itemList) {
                window.CollectionUtil.iterateArrayForModification(itemObj.itemList, function (innerItemObj) {
                  innerItemObj.picked = false
                  return true
                })
              }
              // remove the category
              ref.pickedComponentList.splice(idx, 1)
            }
            return true
          })
          if (exists !== -1) {
            console.log('something wrong... with the iteration and modification process')
          }
        } // end -- if (params.picked == true)
      }
    },
    _getComponentByInstanceIdNCategoryId: function (iId, iCatId) {
      let compList = this.componentsInfo.commonCats
      // try commonCats
      for (let i = 0; i < compList.length; i++) {
        let item = compList[i]
        if (item.instanceId === iId || item.id === iCatId) {
          return item
        }
      }
      // try suggestedCats
      compList = this.componentsInfo.suggestedCats
      for (let i = 0; i < compList.length; i++) {
        let item = compList[i]
        if (item.instanceId === iId || item.id === iCatId) {
          return item
        }
      }
    },
    /**
     * return the concatenation of item(s) on the pickedCategory(s)
     * @returns {Array}
     */
    getAllCategoryListItems: function () {
      // TODO: sorting based on "scores"
      let itemList = []
      this.pickedComponentList.forEach(function (comp) {
        if (comp.itemList) {
          itemList = itemList.concat(comp.itemList)
        }
      })
      return itemList
    },
    /**
     *  back button event handler
     */
    fwdToInfo: function (e) {
      e.preventDefault()
      this.$router.push({
        name: 'templateinfoview'
      })
    },
    /**
     *  next button event handler
     */
    fwdToPreview: function (e) {
      e.preventDefault()
      // validation on if any real background picked
      if (!this.pickedImageList || this.pickedImageList.length === 0) {
        alert('you need to pick at least 1 background image for the banner generation')
      } else {
        // update the vuex store...
        window.DataStore.commit('template/setTemplateBackgroundPicker', {
          pickedImageList: this.pickedImageList,
          pickedCategoryList: this.pickedComponentList
        })
        this.$router.push({
          name: 'templatecategorypreviewview'
        })
      }
    },
    /**
     *  handles the event of option image / background being click
     */
    handleOptionImageClick: function (params) {
      this.pickedImageList = params.pickedImageList
    },
    /**
     *  handles the event of "save" button
     */
    handleSaveImgList: function () {
      // save states to vuex
      // update the vuex store...
      window.DataStore.commit('template/setTemplateBackgroundPicker', {
        pickedImageList: this.pickedImageList,
        pickedCategoryList: this.pickedComponentList
      })
    },
    /**
     *  method to check if the pickedImageList has been changed
     */
    isInfoChanged: function () {
      // logic changed in the pickedImageList content { categoryId, image ... }
      let stateList = window.DataStore.state.template.pickedImageList
      if (stateList.length !== this.pickedImageList.length) {
        return true
      } else {
        // member check
        let len = stateList.length
        for (let i = 0; i < len; i++) {
          let curImg = stateList[i]
          let exists = window.CollectionUtil.iterateArrayForMatching(this.pickedImageList, function (itemObj) {
            if (itemObj.image === curImg.image) {
              return true
            }
            return false
          })

          if (exists === -1) {
            return true
          }
        } // end -- for (iteration of the img list)
      }
      return false
    }
  },
  /**
   *  lifecycle hooks to warn if modified fields are to be disposed
   */
  beforeRouteLeave (to, from, next) {
    // add logic to check if any changes made
    if (this.isInfoChanged() === true) {
      // back button
      if (to.name === 'templateinfoview') {
        if (confirm('there are changes on the picked image(s), would you like to proceed without saving?') === true) {
          next(true)
        }
      } else if (to.name === 'templatecategorypreviewview') {
        // update the vuex store...
        window.DataStore.commit('template/setTemplateBackgroundPicker', {
          pickedImageList: this.pickedImageList
        })
        next(true)
      }
    } else {
      next(true)
    }
  },
  // ** set the child components here => categoryComp = <category-comp>
  components: {
    categoryComp: CategoryComp,
    categoryListComp: CategoryListComp
  }
}
</script>
