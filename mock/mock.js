//引入mockjs
import Mock from "mockjs";
// 引入定义好的数据json
import position from "./position.json";
import index_category from "./index_category.json";
import shops from "./shops.json";
import sendcode from "./sendcode.json";
import login_pwd from "./login_pwd.json";
import login_sms from "./login_sms.json";
import shopGoods from "./shopGoods.json";
import shopRatings from "./shopRatings.json";
import shopInfo from "./shopInfo.json";

// 设置0.5秒至1.5秒间响应
Mock.setup({ timeout: "500-1000" });

// 模拟接口 /position
Mock.mock("http://www.test.com/position/40.10038,116.36867", "get", position);

// 模拟接口 /index_category
Mock.mock("http://www.test.com/index_category", "get", index_category);

// 模拟接口 /shops
Mock.mock(
  "http://www.test.com/shops?longitude=116.36867&latitude=40.10038",
  "get",
  shops
);

// 模拟接口 /sendcode
Mock.mock("http://www.test.com/sendcode?phone=11111111111", "get", sendcode);

// 模拟接口 /login_pwd
Mock.mock("http://www.test.com/login_pwd", "post", login_pwd);

// 模拟接口 /login_sms
Mock.mock("http://www.test.com/login_sms", "post", login_sms);

// 模拟接口 /shop_goods
Mock.mock("http://www.test.com/shop_goods", "get", {
  code: 0,
  data: shopGoods
});

// 模拟接口 /shop_ratings
Mock.mock("http://www.test.com/shop_ratings", "get", {
  code: 0,
  data: shopRatings
});

// 模拟接口 /shop_info
Mock.mock("http://www.test.com/shop_info", "get", { code: 0, data: shopInfo });
