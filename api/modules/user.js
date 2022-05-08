/* user请求模块 */
import {BASE_REQUEST_URL} from '../../common/config/config.json'
import ajax from '../ajax_local.js';

// 根据经纬度获取位置详情
const reqAddress = geohash => ajax(`${BASE_REQUEST_URL}/position/${geohash}`);

// 用户名密码登录
const reqPwdLogin = ({ account, pwd, captcha }) =>
  ajax(`${BASE_REQUEST_URL}/login_pwd`, { account, pwd, captcha }, "POST");

// 发送短信验证码
const reqSendCode = phone => ajax(`${BASE_REQUEST_URL}/sendcode`, { phone });

// 手机号验证码登录
const reqSmsLogin = (phone, code) =>
  ajax(`${BASE_REQUEST_URL}/login_sms`, { phone, code }, "POST");
  
// 根据会话获取用户信息
const reqUserInfo = () => ajax(`${BASE_REQUEST_URL}/userinfo`);
  
// 用户登出
const reqLogout = () => ajax(`${BASE_REQUEST_URL}/logout`);

export default {
	reqAddress,
	reqPwdLogin,
	reqSendCode,
	reqSmsLogin,
	reqSmsLogin,
	reqUserInfo,
	reqLogout
}

