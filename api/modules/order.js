/* order请求模块 */
import {BASE_REQUEST_URL} from '../../common/config/config.json'
import ajax from '../ajax_local.js';

// 请求订单列表
const reqOrderList = () => ajax(`${BASE_REQUEST_URL}/order_list`)

export default {
	reqOrderList
}