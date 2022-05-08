/* cart(购物车)模块状态处理 */
import {
	INCREMENT_FOOD_COUNT,
	DECREMENT_FOOD_COUNT,
	CLEAR_CART,
	UPDATE_SHOP_GOODS
} from '../types.js'

// state
const state = () => ({
	cartFoods: [] // 购物车中的食物列表
})

// actions
const actions = {
	// 更新food中的count值
	updateFoodCountAction({ commit }, { isAdd, food, shopGoodsIndex, foodsIndex }) {
	  if (isAdd) {
	    commit(INCREMENT_FOOD_COUNT, { food, shopGoodsIndex, foodsIndex });
	  } else {
	    commit(DECREMENT_FOOD_COUNT, { food, shopGoodsIndex, foodsIndex });
	  }
	  // 替换原数组中的food, 同步原数组(调用shop中的mutation), root: true声明不是当前模块的mutation
	  commit(`shop/${UPDATE_SHOP_GOODS}`, {food, shopGoodsIndex, foodsIndex}, {root: true})
	},
	
	// 清空购物车
	clearCartAction({ commit }) {
	  commit(CLEAR_CART);
	}
}

// getters
const getters = {
	// 计算购物车商品总数量
	totalCount(state) {
	  return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0);
	},
	
	// 计算购物车商品总价格
	totalPrice(state) {
	  return state.cartFoods.reduce(
	    (preTotal, food) => preTotal + food.count * food.price,
	    0
	  );
	}
}

// mutations
const mutations = {
	// 增加食物数量并判断是否将食物添加到购物车里
	[INCREMENT_FOOD_COUNT](state, { food, shopGoodsIndex, foodsIndex }) {
	  if (!food.count) {
	    food.count = 0;
	    // 添加食物到购物车列表
		  food.shopGoodsIndex = shopGoodsIndex
		  food.foodsIndex = foodsIndex
		  state.cartFoods.push(food)
	  }
	  food.count++;
		// 同步购物车数组
		const cartFoodIndex = state.cartFoods.findIndex(item => item.name === food.name)
		state.cartFoods.splice(cartFoodIndex, 1, food);
	},
	
	// 减少食物数量并判断是否将食物从购物车里移除
	[DECREMENT_FOOD_COUNT](state, { food, shopGoodsIndex, foodsIndex }) {
	  food.count--;
	  if (food.count <= 0) {
	    food.count = 0;
	    // 从购物车列表中移除食物
	    let { cartFoods } = state;
		  const cartFoodIndex = state.cartFoods.findIndex(item => item.name === food.name)
	    state.cartFoods.splice(cartFoodIndex, 1);
	  } else {
			// 同步购物车数组
			const cartFoodIndex = state.cartFoods.findIndex(item => item.name === food.name)
			state.cartFoods.splice(cartFoodIndex, 1, food);
		}
	},
	
	// 更新cartFoods状态, 清空购物车
	[CLEAR_CART](state) {
	  // 把购物车中的食物数量重置为0
	  state.cartFoods.forEach(food => (food.count = 0));
	  // 清空数组
	  state.cartFoods = [];
	}
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}