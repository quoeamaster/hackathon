<template>
  <div>
    <div class="container-fluid container-test">
      <div class="row">
        <div class="col-md-1 col-sm-1 col-1">1.</div>
        <div class="col-md-11 col-sm-11 col-11">
          invoke a fake json api server to get back some response:
          with the courtesy of <span class="powered success-color-dark white-font">https://jsonplaceholder.typicode.com/posts/2</span>
          <p/><button class="btn btn-default btn-sm" @click="fetchTest_1()">go</button>
        </div>
      </div>
    </div>
    <!-- result panels -->
    <div>
      <div class="powered">RESULTS:</div>
      <textarea v-text="resultText" class="container-results"></textarea>
    </div>
  </div>
</template>

<script>
function ModelTestingVue () {
  return {
    'name': 'TestingVue',
    'testResults': [],
    'resultText': ''
  }
}
function updateTestArea (ref, idx) {
  let finalRef = ref
  if (!ref) {
    finalRef = this
  }
  if (idx > -1 && finalRef.testResults.length > idx) {
    finalRef.resultText = finalRef.testResults[idx]
  }
}

export default {
  name: 'TestingVue',
  data: function () {
    return new ModelTestingVue()
  },
  props: [],
  // any just "mounted" actions to take place during this lifecycle hook
  mounted: function () {
  },
  // any variable change watcher actions
  watch: {},
  // biz methods of this component / app
  methods: {
    fetchTest_1: function () {
      let ref = this
      window.jquery.get({
        url: 'https://jsonplaceholder.typicode.com/posts/2',
        data: null,
        success: function (data, sStatus, jqXhr) {
          ref.testResults[0] = data
          updateTestArea(ref, 0)
        },
        dataType: null
      }) // end -- jquery.get()
    }
  }
}
</script>

<style scoped>
.container-test {
  min-height: 200px;
  max-height: 600px;
}
.container-results {
  width: 100%;
  height: 300px;
  border-color: #aaa;
  border-radius: 4px;
  padding-right: 4px;
  padding-left: 4px;
}
.powered {
  font-weight: bolder;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 4px;
}
.white-font {
  color: #eee;
}
</style>
