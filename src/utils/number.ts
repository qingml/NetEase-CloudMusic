export function formatNumber(num: number, point = 2) {
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

/**
 * 补零
 * @param num format number
 * @param len
 */
export const paddingZero = (num: number, len: number) => {
  if (String(num).length > len) return num;

  const restLen = len - String(num).length;

  return `${"0".repeat(restLen)}${num}`;
};

export const formatSecond = (time: number) => {
  // 取整
  time = ~~time;

  var m = ~~parseInt(`${(time % (1000 * 60 * 60)) / (1000 * 60)}`);
  var s = ~~parseInt(`${(time % (1000 * 60)) / 1000}`);
  return Number(m * 60 + s);
};

/**
 * 格式化时间
 * @param time
 * @returns
 */
export const formatDuration = (time: number) => {
  const m = ((time | 0) / 60) | 0;

  const s = (time | 0) % 60 | 0;

  return `${paddingZero(m, 2)}:${paddingZero(s, 2)}`;
};
