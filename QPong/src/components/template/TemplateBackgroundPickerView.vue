<template>
  <div>
    <!-- list out the common categories -->
    <category-comp v-for="item in componentsInfo['commonCats']"
                   v-bind:instanceId="item.instanceId"
                   v-bind:title="item.title"
                   v-bind:image="item.image"
                   v-bind:picked="item.picked"
                   v-on:onCategoryButtonClick="handleCatBtnClick"
                   :key="item.instanceId" ></category-comp>
    <hr class="t-hr">
    <!-- list out the suggested categories -->
    <category-comp v-for="item in componentsInfo['suggestedCats']"
                   v-bind:instanceId="item.instanceId"
                   v-bind:title="item.title"
                   v-bind:image="item.image"
                   v-bind:picked="item.picked"
                   v-on:onCategoryButtonClick="handleCatBtnClick"
                   :key="item.instanceId" ></category-comp>
  </div>
</template>

<style>
.t-hr {
  color: lavender;
  width: 98%;
}
</style>

<script>
// ** import a child component
import CategoryComp from '@/components/template/TemplateCategoryComponent'

function ModelTemplateBackgroundPickerView () {
  return {
    // category-component(s)' id
    componentIdList: [],
    // the category-component(s) queried for display
    componentsInfo: {}
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
        { title: 'common', picked: false, image: '/static/assets/images/category/cat_common_bkg_btn.jpg', instanceId: this.generateComponentId('c-b') },
        { title: 'popular', picked: false, image: '/static/assets/images/category/cat_popular_bkg_btn.jpg', instanceId: this.generateComponentId('c-b') }
      ],
      suggestedCats: [
        { title: 'clothings', picked: false, image: '/static/assets/images/category/cat_clothings_bkg_btn.jpg', instanceId: this.generateComponentId('c-b') },
        { title: 'beverage', picked: false, image: '/static/assets/images/category/cat_beverage_bkg_btn.jpg', instanceId: this.generateComponentId('c-b') },
        { title: 'cakes', picked: false, image: '/static/assets/images/category/cat_cakes_bkg_btn.jpg', instanceId: this.generateComponentId('c-b') },
        { title: 'toys', picked: false, image: '/static/assets/images/category/cat_toys_bkg_btn.jpg', instanceId: this.generateComponentId('c-b') }
      ]
    } // setting the componentsInfo (mockup for now...)
  },
  methods: {
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
    }
  },
  // ** set the child components here => categoryComp = <category-comp>
  components: {
    categoryComp: CategoryComp
  }
}
</script>
