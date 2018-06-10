<template>
  <div>
    <div class="l-container l-scrollable-container">
      <div>
        <category-list-option-comp v-for="item in itemList"
                                   :key="item.instanceId"
                                   v-on:onCategoryListOptionClick="handleListOptionClick"
                                   v-bind:image="item.image"
                                   v-bind:picked="item.picked"
                                   v-bind:title="item.title"
                                   v-bind:instanceId="item.instanceId"></category-list-option-comp>
      </div>
    </div>
    <button class="btn btn-primary">next</button>
  </div>
</template>

<style>
.l-container {
  border-radius: 2px;
}
.l-scrollable-container {
  /* border: 1px solid; */
  max-height: 300px;
  overflow: auto;
  margin-bottom: 20px;
}
</style>

<script>
import CategoryListOptionComp from '@/components/template/TemplateCategoryListOptionComponent'

function ModelTemplateCategoryListComponent () {
  return {}
}

export default {
  name: 'tempaltecategorylistcomponent',
  data: function () {
    return new ModelTemplateCategoryListComponent()
  },
  methods: {
    /**
     * handler for the category-list-option being picked
     * @param params
     */
    handleListOptionClick: function (params) {
      let item = this._getItemByInstanceId(params.instanceId)
      if (item) {
        item.picked = params.picked
      }
    },
    _getItemByInstanceId: function (iId) {
      for (let i = 0; i < this.itemList.length; i++) {
        let item = this.itemList[i]
        if (item.instanceId === iId) {
          return item
        }
      } // end -- for (itemList)
    }
  },
  props: [ 'itemList' ],
  components: {
    categoryListOptionComp: CategoryListOptionComp
  }
}
</script>
