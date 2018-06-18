<template>
  <div>
    to be detailed<p/>
    {{ testing() }}
    <p/>
    <button class="btn btn-primary" @click="issueCommand">ok</button>
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
  mounted: function () {
    const ref = this

    // TODO: call server for suggestions
    ref.getLayoutSuggestionFromQPongServer()
  },
  methods: {
    issueCommand: function () {
      this.getLayoutSuggestionFromQPongServer()
    },

    getLayoutSuggestionFromQPongServer: function () {
      // window.DataStore.state.template.projectId
      let formData = window.DataStore.getters['template/dataModel']
      console.log(formData)

      window.JQueryService.methods.ajaxGet(window.jQuery,
        'http://localhost:8081/template/suggestLayout',
        {}, formData,
        function (data, textStatus, jqXHR) {
          console.log(data)
        },
        null)
    },
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
