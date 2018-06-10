<template>
  <span class="lo-container lo-tooltip" @click="raiseEvent()" :title="title">
    <img v-bind:src="image" class="lo-image lo-image-shadow" />
    <img src="/static/assets/images/icon_checked.png"
         v-bind:class="getIconCheckedCss()"
         class="lo-check-icon" />
  </span>
</template>

<style>
.lo-container {
  border-radius: 2px;
  cursor: pointer;
  /* added to add a spacing between consecutive element(s) */
  margin-bottom: 8px;
  display: inline-block;
}
.lo-image {
  width: 180px;
  height: 75px;
  border-radius: 2px;
  margin-right: 8px;
  opacity: 1.0;
}
.lo-image-shadow {
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.52);
}
.lo-check-icon {
  visibility: hidden;
  width: 16px;
  position: relative;
  top: -24px;
  left: -36px;
  margin-right: -16px;
}
.lo-visible { visibility: visible; }
.lo-hidden { visibility: hidden; }
/* start of tooltip
.lo-tooltip {}
.lo-tooltip .lo-tooltip-text {
  visibility: visible;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  opacity: 0;
  transition: opacity 0.3s;
}
.lo-tooltip .lo-tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
.lo-tooltip:hover .lo-tooltip-text {
  visibility: visible;
  opacity: 1;
} */
</style>

<script>
function ModelTemplateCategoryListOptionComponent () {
  return {}
}

export default {
  name: 'templatecategorylistoptioncomponent',
  data: function () {
    return new ModelTemplateCategoryListOptionComponent()
  },
  props: [ 'instanceId', 'image', 'picked', 'title' ],
  methods: {
    /**
     *  css method
     */
    getIconCheckedCss: function () {
      if (this.picked) {
        return { 'lo-visible': true, 'lo-hidden': false }
      } else {
        return { 'lo-visible': false, 'lo-hidden': true }
      }
    },
    /**
     * raise event back to the parent
     */
    raiseEvent: function () {
      this.$emit('onCategoryListOptionClick', {
        instanceId: this.instanceId,
        picked: !this.picked,
        image: this.image
      })
    }
  }
}
</script>
