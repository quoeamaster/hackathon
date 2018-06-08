<template>
  <div>

    <!--img src="./assets/logo.png"-->
    <router-view/>
    <!-- proof of mdbootstrap is working -->
    <!-- button class="btn btn-danger">danger button</button>
    <button type="button" class="btn btn-outline-info waves-effect">Info</button -->
    <!-- proof of data model working -->
    <!-- div>{{name}}</div -->
  </div>
</template>

<script>
function ModelApp () {
  return {
    'name': 'main-app'
  }
}

export default {
  name: 'App',
  data: function () {
    return new ModelApp()
  },
  props: [],
  // any just "mounted" actions to take place during this lifecycle hook
  mounted: function () {
  },
  // any variable change watcher actions
  watch: {},
  // biz methods of this component / app
  methods: {}
}
</script>

<style>
#app {
  margin: 4px;
}
</style>
