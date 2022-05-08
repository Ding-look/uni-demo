/* shop请求模块 */
import {BASE_REQUEST_URL} from '../../common/config/config.json'
import ajax from '../ajax_local.js';

// 获取食品分类列表
const reqFoodCategorys = () => ajax(`${BASE_REQUEST_URL}/index_category`);

// 根据经纬度获取商铺列表
const reqShops = (longitude, latitude) =>
  ajax(`${BASE_REQUEST_URL}/shops`, { longitude, latitude });
  
  // 根据经纬度和关键字搜索商铺列表
const reqSearchShop = (geohash, keyword) =>
    ajax(`${BASE_REQUEST_URL}/search_shops`, { geohash, keyword });
	
// 获取商家信息
const reqShopInfo = () => ajax(`${BASE_REQUEST_URL}/shop_info`);

// 获取商家评价数组
const reqShopRatings = () => ajax(`${BASE_REQUEST_URL}/shop_ratings`);

// 获取商家商品数组
const reqShopGoods = () => ajax(`${BASE_REQUEST_URL}/shop_goods`);

export default {
	reqFoodCategorys,
	reqShops,
	reqSearchShop,
	reqShopInfo,
	reqShopRatings,
	reqShopGoods
}