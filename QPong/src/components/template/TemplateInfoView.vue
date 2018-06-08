<template>
  <div class="t-form">
    <div class="md-form"><!--  form-inline -->
      <input type="text" v-model="title" class="form-control mb-2 mr-sm-2" placeholder="Title..." />
    </div>
    <div class="md-form">
      <input type="text" v-model="subtitle" class="form-control mb-2 mr-sm-2" placeholder="Sub Title..." />
    </div>
    <div class="">
      <label for="txtQPongDesc" class="t-label -hand-pointer-o">Description</label>
      <textarea v-model="description" id="txtQPongDesc" class="form-control t-textarea"></textarea>
    </div>
    <!-- button -->
    <div class="t-btn-container">
      <button class="btn btn-secondary" @click="saveInfo()">save</button>
      <button class="btn btn-primary" @click="fwdTemplateBackgroundPicker()">next</button>
    </div>
  </div>
</template>

<style>
.t-form {
  padding: 1px 40px 8px 40px;
}
.t-textarea {
  height: 150px;
}
.t-label {
  color: #888;
  font-weight: 400;
  font-size: 18px;
}
.t-btn-container {
  margin-top: 12px;
}
</style>

<script>
function ModelTemplateInfoView () {
  return {
    title: '',
    subtitle: '',
    description: ''
  }
}

export default {
  name: 'templateinfoview',
  data: function () {
    return new ModelTemplateInfoView()
  },
  /**
   *  lifecycle hooks to warn if modified fields are to be disposed
   */
  beforeRouteLeave (to, from, next) {
    if (this.isInfoChanged() === true) {
      if (confirm('template info has been modified, continue without saving?')) {
        // forward to the next page
        next(true)
      }
    } else {
      // forward to the next page
      next(true)
    }
  },
  mounted: function () {
    // re-populate the model values for display
    this.title = window.DataStore.state.template.title
    this.subtitle = window.DataStore.state.template.subtitle
    this.description = window.DataStore.state.template.description
  },
  methods: {
    fwdTemplateBackgroundPicker: function () {
      // update the states
      window.DataStore.commit('setTemplateInfo',
        {
          title: this.title,
          subtitle: this.subtitle,
          description: this.description
        })
      this.$router.push({ name: 'templatebackgroundpickerview' })
    },
    /**
     * check if the info has been changed
     * @returns {boolean}
     */
    isInfoChanged: function () {
      if (this.title !== window.DataStore.state.template.title ||
        this.subtitle !== window.DataStore.state.template.subtitle ||
        this.description !== window.DataStore.state.template.description) {
        // dirty
        return true
      } else {
        return false
      }
    },
    saveInfo: function () {
      // update the states
      window.DataStore.commit('setTemplateInfo',
        {
          title: this.title,
          subtitle: this.subtitle,
          description: this.description
        })
    }
  }
}
</script>
