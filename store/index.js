/* vuex核心管理对象 */
import Vue from 'vue'
import Vuex from 'vuex'
/* 引入业务模块 */
import user from './modules/user.js'
import shop from './modules/shop.js'
import cart from './modules/cart.js'
import order from './modules/order.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
	  user,
	  shop,
	  cart,
	  order
	}
})

