/* shop(商家)模块状态处理 */
import {shopApi} from "../../api/index.js"

import {
	RECEIVE_CATEGORYS,
	RECEIVE_SHOPS,
	RECEIVE_USER_INFO,
	RECEIVE_SHOP_GOODS,
	RECEIVE_SHOP_RATINGS,
	RECEIVE_SHOP_INFO,
	UPDATE_SHOP_GOODS
} from '../types.js'

// state
const state = () => ({
	categorys: [], // 食品分类数据
	shops: [], // 保存商家列表数据
	shopGoods: [], // 保存商家商品数据
	shopRatings: [], // 保存商家评分数据
	shopInfo: [] ,// 保存商家详细信息书
})

// actions
const actions = {
	// 异步获取食品分类列表
	async getCategorys({ commit }) {
	  // 发送异步ajax请求
	  const result = await shopApi.reqFoodCategorys();
	  // 提交一个mutation
	  if (result.code === 0) {
	    const categorys = result.categorys;
	    commit(RECEIVE_CATEGORYS, { categorys });
	  }
	},
	
	// 异步获取商家列表
	async getShops({ commit, state }) {
	  // 发送异步ajax请求
	  const result = await shopApi.reqShops(state.longitude, state.latitude);
	  // 提交一个mutation
	  if (result.code === 0) {
	    const shops = result.shops;
	    commit(RECEIVE_SHOPS, { shops });
	  }
	},
	
	// 异步获取商家商品数据
	async getShopGoods({ commit }) {
	  // 发送异步ajax请求
	  const result = await shopApi.reqShopGoods();
	  // 提交一个mutation
	  if (result.code === 0) {
	    const shopGoods = result.shopGoods;
	    commit(RECEIVE_SHOP_GOODS, { shopGoods });
	  }
	},
	
	// 异步获取商家评分数据
	async getShopRatings({ commit }) {
	  // 发送异步ajax请求
	  const result = await shopApi.reqShopRatings();
	  // 提交一个mutation
	  if (result.code === 0) {
	    const shopRatings = result.shopRatings;
	    commit(RECEIVE_SHOP_RATINGS, { shopRatings });
	  }
	},
	
	// 异步获取商家详细信息数据
	async getShopInfo({ commit }) {
	  // 发送异步ajax请求
	  const result = await shopApi.reqShopInfo();
	  // 提交一个mutation
	  if (result.code === 0) {
	    const shopInfo = result.shopInfo;
	    commit(RECEIVE_SHOP_INFO, { shopInfo });
	  }
	}
}

// mutations
const mutations = {
	// 更新categorys状态
	[RECEIVE_CATEGORYS](state, { categorys }) {
	  state.categorys = categorys;
	},
	
	// 更新shops状态
	[RECEIVE_SHOPS](state, { shops }) {
	  state.shops = shops;
	},
	
	// 更新shopGoods状态
	[RECEIVE_SHOP_GOODS](state, { shopGoods }) {
	  state.shopGoods = shopGoods;
	},
	
	// 更新shopGoods内部状态
	[UPDATE_SHOP_GOODS](state, { food, shopGoodsIndex, foodsIndex  }) {
		state.shopGoods[shopGoodsIndex].foods.splice(foodsIndex, 1, food)
	},
	
	// 更新shopRatings状态
	[RECEIVE_SHOP_RATINGS](state, { shopRatings }) {
	  state.shopRatings = shopRatings;
	},
	
	// 更新shopInfo状态
	[RECEIVE_SHOP_INFO](state, { shopInfo }) {
	  state.shopInfo = shopInfo;
	}
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}