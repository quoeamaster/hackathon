<template>
  <div>
    to be detailed
    {{ testing() }}
  </div>
</template>

<style></style>

<script>
function ModelTemplateCategoryPreviewView () {
  return {}
}

export default {
  name: 'templatecategorypreviewview',
  data: function () {
    return new ModelTemplateCategoryPreviewView()
  },
  methods: {
    /**
     * testing method on vuex member access
     * @returns {Array|*}
     */
    testing: function () {
      return window.DataStore.state.template.pickedImageList
    }
  }
}
</script>
