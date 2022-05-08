/* mutation-types */

// user: mutation-types
export const RECEIVE_ADDRESS = "receive_address"; // 接收地址
export const RECEIVE_USER_INFO = "receive_user_info"; // 接收用户信息

// shop: mutation-types
export const RECEIVE_CATEGORYS = "receive_categorys"; // 接收食品分类数组
export const RECEIVE_SHOPS = "receive_shops"; // 接收商家列表数组
export const RECEIVE_SHOP_GOODS = "receive_shop_goods"; // 接收商家商品数据
export const RECEIVE_SHOP_RATINGS = "receive_shop_ratings"; // 接收商家评分数据
export const RECEIVE_SHOP_INFO = "receive_shop_info"; // 接收商家详细信息数据
export const UPDATE_SHOP_GOODS = "update_shop_goods"; // 更新商品数据

// cart: mutation-types
export const INCREMENT_FOOD_COUNT = "incement_food_count"; // 增加food中的count值
export const DECREMENT_FOOD_COUNT = "decrement_food_count"; // 减少food中的count值
export const CLEAR_CART = "clear_cart"; // 清空购物车

// order: mutation-types
export const RECEIVE_ORDER_LIST = "receive_order_list"; // 接收订单列表