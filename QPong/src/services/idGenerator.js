
export default {
  /**
   * method to generate a random id for component(s)
   * @param componentName
   * @returns {string}
   */
  generateComponentIdByCompName: function (componentName) {
    let id = '__' + componentName + '---' + (new Date().getTime()) + '__'
    return id
  }
}
