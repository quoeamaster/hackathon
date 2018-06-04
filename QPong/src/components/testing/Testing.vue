<template>
  <div>
    <div class="container-fluid container-test">
      <div class="row">
        <div class="col-md-1 col-sm-1 col-1 container-test-item">1.</div>
        <div class="col-md-11 col-sm-11 col-11 container-test-bottom">
          <button class="btn btn-default btn-sm" @click="fetchTest_1()">go</button>
          invoke a fake json api server to get back some response:
          with the courtesy of <span class="powered success-color-dark white-font">https://jsonplaceholder.typicode.com/posts/2</span>
        </div>
      </div>
      <!-- testing on the go server -->
      <div class="row">
        <div class="col-md-1 col-sm-1 col-1 container-test-item">2.</div>
        <div class="col-md-11 col-sm-11 col-11 container-test-bottom">
          <button class="btn btn-default btn-sm" @click="fetchTest_2()">go</button>
          invoke <span class="powered success-color-dark white-font">QPongServer</span> on a testing api
        </div>
      </div>
      <!-- testing on upload -->
      <!-- testing on the go server -->
      <div class="row">
          <div class="col-md-1 col-sm-1 col-1 container-test-item">3.</div>
          <div class="col-md-11 col-sm-11 col-11 container-test-bottom">
            <form action="javascript:void(0)" method="post" enctype="multipart/form-data">
              <input class="form-control form-control-file" type="file" name="pfile" id="pfile" />
              <button class="btn btn-default btn-sm" @click="uploadTest_1()">go</button>
              perform a file upload operation to <span class="powered success-color-dark white-font">QPongServer</span>
            </form>
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
    },
    /*
     *  fetch the testing results from QPongServer
     */
    fetchTest_2: function () {
      let ref = this
      window.jquery.get({
        url: 'http://localhost:8081/testing/101',
        data: null,
        success: function (data, sStatus, jqXhr) {
          ref.testResults[1] = data
          updateTestArea(ref, 1)
        },
        dataType: null
      }) // end -- jquery.get()
    },
    /*
     *  method to test file upload
     */
    uploadTest_1: function () {
      let fileObj = window.jquery('#pfile')
      if (fileObj.length > 0) {
        let formData = new FormData()

        fileObj = fileObj[0]
        for (let i = 0; i < fileObj.length; i++) {
          let file = fileObj[i]
          // Check the file type.
          if (!file.type.match('image.*')) {
            continue
          }
          // Add the file to the request.
          formData.append('pfile[]', file, file.name)
        } // end -- for (files inside the fileObj)

        // ajax call
        window.jquery.ajax({
          url: 'http://localhost:8081/testing/101',
          type: 'POST',
          headers: {
            'X-My-Header': 'something'
          },
          data: formData,
          cache: false,
          dataType: 'json',
          processData: false, // NEVER process the file(s)
          contentType: false, // NEVER set contentType
          success: function (data, textStatus, jqXHR) {
            console.log('*success => ' + textStatus)
            console.log(data)
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log('** error => ' + textStatus)
            console.log(errorThrown)
          }
        })
      } // end -- if (fileObj is valid)
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
  line-height: 2em;
}
.white-font {
  color: #eee;
}
.container-test-bottom {
  border-bottom: 1px solid #aaa;
  margin-top: 8px;
  margin-bottom: 8px;
}
.container-test-item {
  margin-top: 16px;
  margin-bottom: 8px;
}
</style>
