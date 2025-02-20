function convertTextToBinary(
  text: string,
  { separator = ' ' }: { separator?: string } = { separator: ' ' }
): string {
  return text
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(separator);
}
function convertBinaryToText(binary: string): string {
  const cleanBinary = binary.replace(/[^01]/g, '');
  if (cleanBinary.length % 8) {
    throw new Error('Invalid binary string');
  }

  // 将每个二进制字符串转换为字符
  return cleanBinary
    .split(/(\d{8})/)
    .filter(Boolean)
    .map((binary) => String.fromCharCode(Number.parseInt(binary, 2)))
    .join('');
}
export { convertTextToBinary, convertBinaryToText };
