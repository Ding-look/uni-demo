/* user(用户)模块状态处理 */
import {userApi} from '../../api/index.js'

import {
	RECEIVE_ADDRESS,
	RECEIVE_USER_INFO
} from '../types.js'

// state
const state = () => ({
	latitude: 40.10038, // 经度
	longitude: 116.36867, // 纬度
	address: {}, // 地址信息数据
	userInfo: {} // 保存用户登录信息
})

// actions
const actions = {
	// 异步获取地址
	async getAddress({ commit, state }) {
	  // 发送异步ajax请求
	  const geohash = state.latitude + "," + state.longitude;
	  const result = await userApi.reqAddress(geohash);
	  // 提交一个mutation
	  if (result.code === 0) {
	    const address = result.address;
	    commit(RECEIVE_ADDRESS, { address });
	  }
	},
	
	// 异步调用短信登录接口
	async smsLoginAction ({commit}, {phone, code, loginResult}) {
		const result = await userApi.reqSmsLogin({ phone, code });
		// 提交一个mutation
		if (result.code === 0) {
			const userInfo = result.userInfo
			commit(RECEIVE_USER_INFO, { userInfo });
			// 存入浏览器本地
			uni.setStorage({
				key: 'userInfo',
				data: JSON.stringify(userInfo)
			})
			loginResult && loginResult(result.code)
		}
	},
	
	// 异步调用密码登录接口
	async pwdLoginAction ({commit}, {account, pwd, captcha, loginResult}) {
		const result = await userApi.reqPwdLogin({ account, pwd, captcha });
		// 提交一个mutation
		if (result.code === 0) {
			const userInfo = result.userInfo
			commit(RECEIVE_USER_INFO, { userInfo });
			// 存入浏览器本地
			uni.setStorage({
				key: 'userInfo',
				data: JSON.stringify(userInfo)
			})
			loginResult && loginResult(result.code)
		}
	},
	
	// 保存用户信息
	recordUserInfo({ commit }, userInfo) {
	  commit(RECEIVE_USER_INFO, { userInfo });
	  // 存入浏览器本地
		uni.setStorage({
			key: 'userInfo',
			data: JSON.stringify(userInfo)
		})
	},
	
	// 从本地获取用户信息
	getUserInfoByLocal({ commit }) {
		  uni.getStorage({
		      key: 'userInfo',
		      success (res) {
				  const userInfoString = res.data;
				  if (userInfoString) {
				    const userInfo = JSON.parse(userInfoString);
				    commit(RECEIVE_USER_INFO, { userInfo });
				  }
			  }
		  });
	},
	
	// 移除本地用户信息
	removeLocalUserInfo({ commit }) {
	  // 移除store中的用户信息
	  commit(RECEIVE_USER_INFO, { userInfo: {} });
	  // 移除localStorage中的用户信息
	  uni.removeStorage({
	  	key: 'userInfo'
	  })
	}
	
}

// mutations
const mutations = {
	// 更新address状态
	[RECEIVE_ADDRESS](state, { address }) {
	  state.address = address;
	},
	// 更新userInfo状态
	[RECEIVE_USER_INFO](state, { userInfo }) {
	  state.userInfo = userInfo;
	},
	
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

