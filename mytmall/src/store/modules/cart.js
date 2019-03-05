import * as types from '../mutation-types.js'

const storage = window.localStorage

const state = {
  added: []
}
// getter
const getters = {
  cartLists: state => state.added
}
// actions
const actions = {

}
// mutations
const mutations = {
  [types.ADD_TO_CART](state, product) {
   
    // 定义一个ID 来获取 前面传值的 当前数据的ID
    let id = product.id
    const record = state.added.find(p => p.id === id && p.type === product.type)
    // 解决方法一 找到数据遍历一次
    // 方法二 是获取到父级的数据
    //如果是同一个商品增加数量,不是同一个商品添加到购物车
    if (!record) {
      state.added.push(product)
    } else {
      record.quantity += product.quantity
    }
    // 将添加的商品存到 localStorage 中
    storage.setItem('cart', JSON.stringify(state.added))
  },
  //传入商品的信息 product  id和类型判断当前存储的商品       要修改的数量
  // 更新产品的数据
  [types.UPDATE_THIS_PRODUCT](state, product) {
    let { id, type, quantity } = product //对象的解构
    const record = state.added.find(p => p.id === id && p.type === type)
    if (quantity > 0) {
      record ? record.quantity = quantity : ''
    } else {
      // 传入的商品数量为0 就删除这个商品 删除指定的序号的商品
      let index = state.added.indexOf(record)
      state.added.splice(index, 1)
    }
    storage.setItem('cart', JSON.stringify(state.added))

  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
