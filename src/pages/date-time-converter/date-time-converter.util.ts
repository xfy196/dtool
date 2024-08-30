import { isRFC3339, isISO8601 } from "validator";
const isISO9075DateString = (date: string): boolean => {
  return isISO8601(date);
};
const isISO8601DateString = (date: string): boolean => {
  return isISO8601(date, {
    strict: true,
    strictSeparator: true,
  });
};
const isRFC3399DateString = (date: string): boolean => {
  return isRFC3339(date);
};
const isRFC7231DateString = (date: string): boolean => {
  const regex = /^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/;
  return regex.test(date);
};
const isUnixDateString = (date: string): boolean => {
  // 正则表达式匹配 Unix 时间戳
  const regex = /^[0-9]{1,10}$/;
  return regex.test(date);
};
const isTimestamp = (date: string): boolean => {
  const regex = /^[0-9]{1,13}$/;
  return regex.test(date);
};
const isUTCDateString = (date: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
  return regex.test(date);
};
export {
  isISO8601DateString,
  isISO9075DateString,
  isRFC3399DateString,
  isUnixDateString,
  isRFC7231DateString,
  isTimestamp,
  isUTCDateString,
};
