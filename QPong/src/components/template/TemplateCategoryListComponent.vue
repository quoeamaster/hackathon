<template>
  <div>
    <div class="l-container l-scrollable-container">
      <div>
        <category-list-option-comp v-for="item in itemList"
                                   :key="item.instanceId"
                                   v-on:onCategoryListOptionClick="handleListOptionClick"
                                   v-on:onCategoryListOptionImgPreview="handleListOptionImgPreview"
                                   v-bind:categoryId="item.categoryId"
                                   v-bind:image="item.image"
                                   v-bind:picked="item.picked"
                                   v-bind:title="item.title"
                                   v-bind:instanceId="item.instanceId"></category-list-option-comp>
      </div>
    </div>
    <!-- modal lightbox -->
    <div v-bind:style="getLightboxStyle()" class="lbox-modal">
      <span class="lbox-close" @click="closeLightbox()">&times;</span>
      <div class="lbox-modal-content">
        <div class="lbox-image-container">
          <!-- div class="numbertext">1 / 4</div -->
          <img :src="lightboxImage" style="width:100%">
        </div>
      </div> <!-- lightbox content -->
    </div>
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
/* https://www.w3schools.com/howto/howto_js_lightbox.asp */
.lbox-modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: black;
}
.lbox-modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 90%;
  max-width: 800px;
}

.lbox-close {
  color: white;
  position: absolute;
  top: 10px;
  right: 25px;
  font-size: 35px;
  font-weight: bold;
  cursor: pointer;
}
.lbox-close:hover,
.lbox-close:focus {
  color: #999;
  text-decoration: none;
  cursor: pointer;
}
.lbox-image-container {}
</style>

<script>
import CategoryListOptionComp from '@/components/template/TemplateCategoryListOptionComponent'

function ModelTemplateCategoryListComponent () {
  return {
    'showLightbox': false,
    'lightboxImage': '',
    // TODO: change from simply image url => { imageUrl, categoryId }
    'pickedImageList': []
  }
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
        // update the pickedImageList[]
        this._updateListOption(item)
        // raiseEvent back to parent
        this.$emit('onOptionImageClick', {
          'pickedImageList': this.pickedImageList
        })
      }
    },
    _updateListOption: function (item) {
      if (item) {
        let exists = window.CollectionUtil.iterateArrayForMatching(this.pickedImageList, function (imageObj) {
          if (imageObj.image === item.image) {
            return true
          }
          return false
        })

        if (item.picked === true && exists === -1) {
          this.pickedImageList.push(item)
        } else if (item.picked === false && exists !== -1) {
          this.pickedImageList.splice(exists, 1)
        }
      } // end -- if (item) is valid
    },
    handleListOptionImgPreview: function (params) {
      this.lightboxImage = params['image']
      this.showLightbox = true
    },
    _getItemByInstanceId: function (iId) {
      for (let i = 0; i < this.itemList.length; i++) {
        let item = this.itemList[i]
        if (item.instanceId === iId) {
          return item
        }
      } // end -- for (itemList)
    },
    getLightboxStyle: function () {
      if (this.showLightbox === true) {
        return {
          display: 'block'
        }
      } else {
        return {
          display: 'none'
        }
      }
    },
    closeLightbox: function () {
      this.showLightbox = false
    }
  },
  props: [ 'itemList' ],
  components: {
    categoryListOptionComp: CategoryListOptionComp
  }
}
</script>
