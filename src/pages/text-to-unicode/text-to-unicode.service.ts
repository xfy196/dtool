const convertUnicodeToText = (text: string): string => {
  return text
    .split('')
    .map((str) => `&#${str.charCodeAt(0)};`)
    .join('');
};
const convertTextToUnicode = (unicode: string): string => {
  return unicode.replace(/&#(\d+);/g, (_match, dec) =>
    String.fromCharCode(dec)
  );
};
export { convertUnicodeToText, convertTextToUnicode };
