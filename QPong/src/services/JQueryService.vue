<!-- TODO can be just js.. maybe -->
<script>
function ModelJQueryService () {
  return {}
}

/**
 * common failure method to be executed based on jquery ajax request(s)
 * @param jqXHR
 * @param textStatus
 * @param errorThrown
 * @param showAlert
 */
function defaultAjaxFailFx (jqXHR, textStatus, errorThrown, showAlert) {
  let msg = ''
  // check if textStatus is valid or not
  if (textStatus && textStatus !== '') {
    msg = textStatus
  }
  if (errorThrown) {
    msg += ' error => ' + errorThrown
  }
  // should show the msg through alert or console.log?
  if (showAlert) {
    alert(msg)
  } else {
    console.log(msg)
  }
}

/**
 * common success method to be executed based on jquery ajax request(s)
 * @param data
 * @param textStatus
 * @param jqXHR
 * @param showAlert
 */
function defaultAjaxSuccessFx (data, textStatus, jqXHR, showAlert) {
  if (showAlert) {
    alert('** operation success - status = ' + textStatus + ' data => ' + data)
  } else {
    console.log('** operation success - status = ' + textStatus)
    // log out directly could list out all attributes within the "data" object
    console.log(data)
  }
}

export default {
  name: 'jqueryservice',
  data: function () {
    return new ModelJQueryService()
  },
  methods: {
    /**
     * method to perform ajax upload
     * @param jqueryObj
     * @param url
     * @param headers
     * @param formData
     * @param successFx
     * @param failFx
     */
    ajaxUpload: function (jqueryObj, url, headers, formData, successFx, failFx) {
      let finalHeaders = {}
      let finalFormData = null
      let finalSuccessFx = defaultAjaxSuccessFx
      let finalFailFx = defaultAjaxFailFx
      // start validation
      if (!jqueryObj) {
        defaultAjaxFailFx(null, 'jQuery object is NULL or invalid', null, true)
      }
      if (headers) {
        finalHeaders = headers
      }
      if (formData) {
        finalFormData = formData
      } else {
        finalFormData = new FormData()
      }
      if (successFx) {
        finalSuccessFx = successFx
      }
      if (failFx) {
        finalFailFx = failFx
      }
      // run the ajax upload
      jqueryObj.ajax({
        url: url,
        type: 'POST',
        headers: finalHeaders,
        data: finalFormData,
        cache: false,
        dataType: 'json',
        processData: false, // NEVER process the file(s)
        contentType: false, // NEVER set contentType
        success: function (data, textStatus, jqXHR) {
          finalSuccessFx(data, textStatus, jqXHR, true)
        },
        error: function (jqXHR, textStatus, errorThrown) {
          finalFailFx(jqXHR, textStatus, errorThrown, false)
        }
      })
      // end -- ajax call
    },
    /**
     * ajax GET method
     * @param jqueryObj
     * @param url
     * @param headers
     * @param data
     * @param successFx
     * @param failFx
     */
    ajaxGet: function (jqueryObj, url, headers, data, successFx, failFx) {
      let finalSuccess = defaultAjaxSuccessFx
      let finalFail = defaultAjaxFailFx
      let finalHeaders = {}
      // start validation
      if (!jqueryObj) {
        defaultAjaxFailFx(null, 'jQuery object is NULL or invalid', null, true)
      }
      if (successFx) {
        finalSuccess = successFx
      }
      if (failFx) {
        finalFail = failFx
      }
      if (headers) {
        finalHeaders = headers
      }
      // run the ajax GET
      jqueryObj.ajax({
        url: url,
        type: 'GET',
        headers: finalHeaders,
        data: data,
        cache: false,
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
          finalSuccess(data, textStatus, jqXHR, true)
        },
        error: function (jqXHR, textStatus, errorThrown) {
          finalFail(jqXHR, textStatus, errorThrown, false)
        }
      })
      // end -- ajax GET
    }
  }
}
</script>
