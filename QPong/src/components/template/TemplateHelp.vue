<template>
  <div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h3 class="h4-reponsive mb-4 mt-2 deep-purple-text font-bold">Welcome to QPong Templates</h3>
        <p class="lead text-justify">
          QPong templates provides a way to create banners in a seamless way.
          Just enter the "title", "subtitle" and "description" values;
          then pick the background photos you are interested in, and ...
          Voila, the banners are nicely generated for you in a split second.
        </p>
        <p class="lead">
          <button class="btn btn-primary -hand-pointer-o" @click="fwdToTemplateInfoView()" >Get started</button>
        </p>
      </div>
    </div>
    <!--router-link to="/template">Back to template main</router-link-->
  </div>
</template>

<style></style>

<script>
function ModelTemplateHelp () {
  return {}
}

export default {
  name: 'templatehelp',
  data: function () {
    return new ModelTemplateHelp()
  },
  methods: {
    fwdToTemplateInfoView: function () {
      this.$router.push({
        name: 'templateinfoview'
      })
    }
  }
}
</script>
