
export default {
  /**
   * check if the given array matches a certain criteria;
   * returns the element index for found element or
   * simply -1 for non existing scenario
   *
   * @param arrayObj
   * @param matchingFunc
   * @returns {number}; -1 means not found, non -1 is the index of the found element
   */
  iterateArrayForMatching: function (arrayObj, matchingFunc) {
    if (arrayObj && (typeof matchingFunc) === 'function') {
      // for (let i = 0; i < arrayObj.length; i++) {
      for (let i = arrayObj.length - 1; i >= 0; i--) {
        if (matchingFunc(arrayObj[i], i) === true) {
          return i
        }
      }
    }
    return -1
  },
  /**
   * method to apply modification to the members based on the logic
   * from the "modifyFunc" function.
   * "stopOnError" parameter is optional => true means stop when exception occurs.
   *
   * @param arrayObj
   * @param modifyFunc
   * @param stopOnError
   * @returns {number}; -1 means all good; non -1 value means the modification fails at that element under the index
   */
  iterateArrayForModification: function (arrayObj, modifyFunc, stopOnError) {
    // if stopOnError flag not set => default to true;
    // so now if modifyFunc returns false => break and return the index value
    if (!stopOnError) {
      stopOnError = true
    }
    if (arrayObj && (typeof modifyFunc) === 'function') {
      // for (let i = 0; i < arrayObj.length; i++) {
      for (let i = arrayObj.length - 1; i >= 0; i--) {
        if (modifyFunc(arrayObj[i], i) === false && stopOnError) {
          return i
        }
      }
    }
    return -1
  }
}
