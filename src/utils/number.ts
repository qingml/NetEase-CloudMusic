export function formatNumber(num: number, point = 0) {
  const numStr = num.toString();
  // 十万以内直接返回
  if (numStr.length < 6) {
    return numStr;
  } else if (numStr.length > 8) {
    //大于8位数是亿
    const decimal = numStr.substring(
      numStr.length - 8,
      numStr.length - 8 + point
    );
    return parseFloat(parseInt(`${num / 100000000}`) + "." + decimal) + "亿";
  } else if (numStr.length > 5) {
    //大于6位数是十万 (以10W分割 10W以下全部显示)
    const decimal = numStr.substring(
      numStr.length - 4,
      numStr.length - 4 + point
    );
    return parseFloat(parseInt(`${num / 10000}`) + "." + decimal) + "万";
  }
}
