// 导入方法名称
import * as types from './mutation-types.js'
export default {
  [types.ADDGOODS](state, value) {
    state.goodsList = value
  },
  [types.PRODUCTINFO](state, value) {
    state.productInfo = value
  }
}
