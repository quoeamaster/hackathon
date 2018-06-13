<template>
  <!-- set the id of the instance; so that jquery could query back the html parts -->
  <span v-bind:id="componentId" class="c-container" @click="raiseEvent()">
    <img :src="image" class="c-image c-container-shadow">
    <span class="c-label" v-bind:style="getLabelCss()" >{{title}}</span>
    <img src="/static/assets/images/icon_checked.png"
         v-bind:class="getIconCheckedCss()"
         class="c-check-icon" />
  </span>
</template>

<style>
.c-container {
  border-radius: 2px;
  cursor: pointer;
  /* added to add a spacing between consecutive element(s) */
  margin-bottom: 8px;
  display: inline-block;
}
.c-image {
  width: 120px;
  height: 50px;
  border-radius: 2px;
  margin-right: 8px;
  opacity: 0.75;
}
.c-container-shadow {
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.52);
}
.c-label {
  position: relative;
  top: 3px;
  color: #fff; /* FFFAF0 */
  text-shadow: 2px 2px rgba(0,0,0,0.7);
}
.c-check-icon {
  visibility: hidden;
  width: 16px;
  position: relative;
  top: -12px;
  left: -36px;
  margin-right: -16px;
}
.c-visible { visibility: visible; }
.c-hidden { visibility: hidden; }
</style>

<script>
function ModelTemplateCategoryComponent () {
  return {
    dummy: true
  }
}
export default {
  name: 'templatecategorycomponent',
  data: function () {
    return new ModelTemplateCategoryComponent()
  },
  mounted: function () {
    const ref = this
    // create some "delay" so that the html parts are ready
    setTimeout(function () {
      ref.dummy = !ref.dummy
    }, 1)

    /*
    if (window.DataStore.getters['template/categoryItemById'](this.id) !== null) {
      this.pickedFromStore = true
    }
    */
  },
  methods: {
    raiseEvent: function () {
      this.$emit('onCategoryButtonClick', {
        instanceId: this.componentId,
        picked: !this.picked
      })
    },
    /**
     * should display the icon-checked?
     */
    getIconCheckedCss: function () {
      // show the checked mark either by the props.picked or state.picked
      if (this.picked || this.pickedFromStore) {
        return { 'c-visible': true, 'c-hidden': false }
      } else {
        return { 'c-visible': false, 'c-hidden': true }
      }
    },
    /**
     * calculate the dimensions for the "c-label" part
     * @returns {*}
     */
    getCLabelDimension: function () {
      let labels = window.jquery('span[id=' + this.componentId + '] .c-label') // '.c-label'
      if (labels.length > 1) {
        console.log('something wrong, should have only 1 c-label...')
      } else {
        let e = window.jquery(labels[0])
        let img = window.jquery('span[id=' + this.componentId + '] img')
        return {
          label: e,
          width: e.width(),
          height: e.height(),
          imgWidth: img.width(),
          imgHeight: img.height()
        }
      }
      // simply no idea what the width is...
      return 0
    },
    /**
     * return the css class object for the position of the c-label in general
     * @returns {{dummy: *}}
     */
    getLabelCss: function () {
      let labelDimen = this.getCLabelDimension()
      let top = 0 // (50 - labelDimen.height) / 2
      let margin = (120 - labelDimen.width) / 2
      let left = (-120 - 8 + margin)
      return {
        'dummy': this.dummy,
        top: top + 'px',
        left: left + 'px',
        'margin-right': (-labelDimen.width - 0) + 'px' // can deduct the 8px margin too...
      }
    }
  },
  // instanceId = id of this component; useful to identify which component it is
  // when multiple instances are available within a view
  props: [ 'instanceId', 'id', 'title', 'image', 'picked' ],
  computed: {
    componentId: function () {
      return this.instanceId
    }
  }
}
</script>
