
export default {
  /**
   * method to generate a random id for component(s)
   * @param componentName
   * @returns {string}
   */
  generateComponentIdByCompName: function (componentName) {
    let id = '__' + componentName + '---' + (new Date().getTime()) + '__'
    return id
  },
  /**
   * method to generate a random if for the project
   * @returns {string}
   */
  generateProjectId: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = Math.random() * 16 | 0
        let v = c === 'x' ? r : (r & 0x3 | 0x8)

        return v.toString(16)
      })
  }
}
