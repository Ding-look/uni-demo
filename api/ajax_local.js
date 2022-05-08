/*模拟ajax从本地取数据*/

export default function ajax_local (url, data={}, type='GET') {
	const req_list = [
		{ name: 'position', data: import("../mock/modules/position.json") },
		{ name: 'index_category', data: import("../mock/modules/index_category.json") },
		{ name: 'shops', data: import("../mock/modules/shops.json") },
		{ name: 'login_pwd', data: import("../mock/modules/login_pwd.json") },
		{ name: 'sendcode', data: import("../mock/modules/sendcode.json") },
		{ name: 'login_sms', data: import("../mock/modules/login_sms.json") },
		{ name: 'shop_goods', data: import("../mock/modules/shop_goods.json")},
		{ name: 'shop_ratings', data: import("../mock/modules/shop_ratings.json")},
		{ name: 'shop_info', data: import("../mock/modules/shop_info.json")},
		{ name: 'order_list', data: import("../mock/modules/order_list.json")}
	]
	return new Promise(function(resolve, reject){
		// 模拟获取接口
		req_list.forEach((item) => {
			if (url.indexOf(item.name) != -1) {
				// 延时700ms, 模拟接口请求时间
				setTimeout(() => {
					resolve(item.data)
				}, 700)
			}
		})
	})
}