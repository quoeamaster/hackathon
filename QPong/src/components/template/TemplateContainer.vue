<template>
  <div class="t-body">
    <div>
      <label class="t-caption">
        template wizard
        <i class="fa fa-paint-brush" style="font-size: 14px; color: darkgreen;" aria-hidden="true"></i>
      </label>
      <span class="pull-right t-caption-right" @click="fwdTemplateHome()">
        <i class="fa fa-home t-icon" aria-hidden="true"></i>
      </span>
    </div>
    <div class="t-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.t-body {
  font-family: "Roboto", sans-serif, Arial;
  padding: 12px 12px 24px 12px;
}
.t-caption {
  font-weight: 400;
  font-size: 18px;
}
.t-content {
  margin-top: 20px;
}
.t-caption-right {
  padding-right: 8px;
}
.t-icon {
  cursor: pointer;
}
</style>

<script>
function ModelTemplateContainer () {
  return {}
}

export default {
  name: 'templatecontainer',
  data: function () {
    return new ModelTemplateContainer()
  },
  methods: {
    fwdTemplateHome: function () {
      this.$router.push({ name: 'templatehelp' })
    }
  }
}
</script>
