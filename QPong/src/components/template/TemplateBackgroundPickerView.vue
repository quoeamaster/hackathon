<template>
  <div>
    <div class="t-main-label">Categories</div>
    <!-- list out the common categories -->
    <category-comp v-for="item in componentsInfo['commonCats']"
                   v-bind:instanceId="item.instanceId"
                   v-bind:title="item.title"
                   v-bind:image="item.image"
                   v-bind:picked="item.picked"
                   v-on:onCategoryButtonClick="handleCatBtnClick"
                   :key="item.instanceId" ></category-comp>
    <p/>
    <!-- list out the suggested categories -->
    <category-comp v-for="item in componentsInfo['suggestedCats']"
                   v-bind:instanceId="item.instanceId"
                   v-bind:title="item.title"
                   v-bind:image="item.image"
                   v-bind:picked="item.picked"
                   v-on:onCategoryButtonClick="handleCatBtnClick"
                   :key="item.instanceId" ></category-comp>
    <hr class="t-hr">
    <div class="t-main-label">Option List</div>
    <category-list-comp v-bind:itemList="getAllCategoryListItems()" ></category-list-comp>
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
    pickedComponentList: []
  }
}

export default {
  name: 'templatebackgroundpickerview',
  data: function () {
    return new ModelTemplateBackgroundPickerView()
  },
  mounted: function () {
    // TODO call service to load the suitable categories from QPong server (etc); MOCKUP for now
    this.componentsInfo = {
      commonCats: [
        {
          title: 'common',
          picked: false,
          image: '/static/assets/images/category/cat_common_bkg_btn.jpg',
          instanceId: this.generateComponentId('c-b'),
          itemList: [
            { title: 'pokemon pikachiu', picked: false, image: '/static/assets/images/category/list/cat_toy_pokemon_pikachiu_bkg.jpg', instanceId: this.generateComponentId('c-l') },
            { title: 'Fußball', picked: false, image: '/static/assets/images/category/list/cat_sports_football_bkg.jpg', instanceId: this.generateComponentId('c-l') }
          ]
        },
        { title: 'popular', picked: false, image: '/static/assets/images/category/cat_popular_bkg_btn.jpg', instanceId: this.generateComponentId('c-b') }
      ],
      suggestedCats: [
        { title: 'clothings', picked: false, image: '/static/assets/images/category/cat_clothings_bkg_btn.jpg', instanceId: this.generateComponentId('c-b') },
        { title: 'beverage', picked: false, image: '/static/assets/images/category/cat_beverage_bkg_btn.jpg', instanceId: this.generateComponentId('c-b') },
        { title: 'cakes', picked: false, image: '/static/assets/images/category/cat_cakes_bkg_btn.jpg', instanceId: this.generateComponentId('c-b') },
        {
          title: 'toys',
          picked: false,
          image: '/static/assets/images/category/cat_toys_bkg_btn.jpg',
          instanceId: this.generateComponentId('c-b'),
          itemList: [
            { title: 'Русская матрешка', picked: false, image: '/static/assets/images/category/list/cat_toys_russian_doll_bkg.jpg', instanceId: this.generateComponentId('c-l') },
            { title: 'basketball fever', picked: false, image: '/static/assets/images/category/list/cat_toys_basketball_bkg.jpg', instanceId: this.generateComponentId('c-l') }
          ]
        }
      ]
    } // setting the componentsInfo (mockup for now...)
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
    handleCatBtnClick: function (params) {
      // update the componentsInfo's picked status
      // depends on the biz logic, you might want to de-activate other components' picked status
      let component = this._getComponentByInstanceId(params.instanceId)
      if (component) {
        component.picked = params.picked

        // update the pickedComponentList
        if (params.picked) {
          this.pickedComponentList.push(component)
        } else {
          let size = this.pickedComponentList.length
          for (let i = (size - 1); i >= 0; i--) {
            let item = this.pickedComponentList[i]
            if (item.instanceId === params.instanceId) {
              // reset the inner itemList "picked" value as well
              if (!item.itemList) {
                continue
              }
              let size1 = item.itemList.length
              for (let i1 = 0; i1 < size1; i1++) {
                item.itemList[i1].picked = false
              }
              // remove this component
              this.pickedComponentList.splice(i, 1)
            }
          }
        } // end -- if (params.picked == true)
      }
    },
    _getComponentByInstanceId: function (iId) {
      let compList = this.componentsInfo.commonCats
      // try commonCats
      for (let i = 0; i < compList.length; i++) {
        let item = compList[i]
        if (item.instanceId === iId) {
          return item
        }
      }
      // try suggestedCats
      compList = this.componentsInfo.suggestedCats
      for (let i = 0; i < compList.length; i++) {
        let item = compList[i]
        if (item.instanceId === iId) {
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
    }
  },
  // ** set the child components here => categoryComp = <category-comp>
  components: {
    categoryComp: CategoryComp,
    categoryListComp: CategoryListComp
  }
}
</script>
