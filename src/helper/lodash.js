/*
  @date: 2017-08-01
  @lastModify: 2018-05-16
  @desc: Modular Lodash builds without the hassle. You can freely add the method you need
  @detail:
    https://www.npmjs.com/package/lodash-webpack-plugin
    https://www.npmjs.com/package/babel-plugin-lodash
*/
import _ from 'lodash'

export default {
  clone: _.clone,
  cloneDeep: _.cloneDeep,
  endsWith: _.endsWith,
  isEmpty: _.isEmpty,
  flatten: _.flatten,
  flattenDepth: _.flattenDepth,
  throttle: _.throttle
}
