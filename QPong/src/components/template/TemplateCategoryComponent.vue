<template>
  <!-- set the id of the instance; so that jquery could query back the html parts -->
  <span v-bind:id="componentId">
    this is the id {{instanceId}}
  </span>
</template>

<style></style>

<script>
function ModelTemplateCategoryComponent () {
  return {
  }
}
export default {
  name: 'templatecategorycomponent',
  data: function () {
    return new ModelTemplateCategoryComponent()
  },
  methods: {
  },
  // instanceId = id of this component; useful to identify which component it is
  // when multiple instances are available within a view
  props: [ 'instanceId' ],
  computed: {
    componentId: function () {
      return this.instanceId
    }
  }
}
</script>
