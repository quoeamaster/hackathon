<template>
  <div>
    <!--category-comp v-bind:instanceId="generateComponentId('c-btn')"></category-comp>
    <category-comp v-bind:instanceId="generateComponentId('c-btn')"></category-comp-->
    <category-comp v-for="item in componentsInfo['commonCats']" v-bind:instanceId="item.instanceId" :key="item.instanceId" ></category-comp>
  </div>
</template>

<style></style>

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
        { title: 'common', instanceId: this.generateComponentId('c-b') },
        { title: 'popular', instanceId: this.generateComponentId('c-b') }
      ],
      suggestedCats: [
        { title: 'clothings', instanceId: this.generateComponentId('c-b') },
        { title: 'beverage', instanceId: this.generateComponentId('c-b') },
        { title: 'cakes', instanceId: this.generateComponentId('c-b') },
        { title: 'toys', instanceId: this.generateComponentId('c-b') }
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
    }
  },
  // ** set the child components here => categoryComp = <category-comp>
  components: {
    categoryComp: CategoryComp
  }
}
</script>
