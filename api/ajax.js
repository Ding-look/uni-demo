/*
ajax 函数请求模块
返回值: promise对象(异步返回的数据是response.data)
*/
import axios from "axios";
export default function ajax(url, data = {}, type = "GET") {
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
      // 发送GET请求
      promise = axios.get(url);
	  console.log(promise)
    } else {
      // 发送POST请求
      promise = axios.post(url, data);
    }
    promise
      .then(function(response) {
        // 请求成功调用resolve
        resolve(response.data);
      })
      .catch(function(error) {
        // 请求失败调用reject
        reject(error);
      });
  });
}
