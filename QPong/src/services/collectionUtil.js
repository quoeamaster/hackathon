
export default {
  /**
   * check if the given array matches a certain criteria;
   * returns the element index for found element or
   * simply -1 for non existing scenario
   *
   * @param arrayObj
   * @param matchingFunc
   * @returns {number}
   */
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
