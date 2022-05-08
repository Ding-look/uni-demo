/*
ajax 函数请求模块
返回值: promise对象(异步返回的数据是response.data)
*/
export default function ajax_uni(url, data = {}, type = 'GET') {
	return new Promise(function(resolve, reject) {
		let promise;
		if (type === "GET") {
			// 准备url query参数数据
			let dataStr = ""; //参数拼接字符串
			// 循环data对象拼接参数
			Object.keys(data).forEach(key => {
				dataStr += key + "=" + data[key] + "&";
			});
			if (dataStr !== "") {
				dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
				url = url + "?" + dataStr;
			}
		}
		// 发送请求
		uni.request({
			url,
			data,
			method: type,
			success(res) {
				resolve(res.data)
			},
			fail(e) {
				reject(e)
			}
		});
	});
}
