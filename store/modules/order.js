/* order(订单)模块状态处理 */
import {orderApi} from '../../api/index.js'

import {
	RECEIVE_ORDER_LIST
} from '../types.js'

// state
const state = () => ({
	orderList: []
})

// actions
const actions = {
	// 读取订单列表
	async getOrderList ({commit}) {
		// 发送异步ajax请求
		const result = await orderApi.reqOrderList();
		// 提交一个mutation
		if (result.code === 0) {
		  const orderList = result.orderList;
		  commit(RECEIVE_ORDER_LIST, { orderList });
		}
	}
}

// mutations
const mutations = {
	// 更新订单列表state
	[RECEIVE_ORDER_LIST] (state, {orderList}) {
		state.orderList = orderList
	}
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}