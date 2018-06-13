
export default {
  iterateArrayForMatching: function (arrayObj, matchingFunc) {
    if (arrayObj && (typeof matchingFunc) === 'function') {
      for (let i = 0; i < arrayObj.length; i++) {
        if (matchingFunc(arrayObj[i]) === true) {
          return i
        }
      }
    }
    return -1
  }
}
