/* 公共方法 */
import format from "date-fns/format";
// 日期格式化
const dateFormat = (data, formatStr = "yyyy-MM-dd HH:mm:ss") => {
  return format(data, formatStr);
};

export { dateFormat };
