const random = () => Math.random();

// 从数组中随机取一个元素
const randomFromArray = (array: unknown[]) =>
  array[Math.floor(random() * array.length)];

const shuffleArrayMutate = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffleString = (str: string, delimiter = ''): string => {
  return shuffleArrayMutate(str.split(delimiter)).join(delimiter);
};
const generateRandomHex = (length: number) => {
  let hexChars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += hexChars[Math.floor(Math.random() * 16)];
  }
  return result;
};

export {
  randomFromArray,
  shuffleString,
  shuffleArrayMutate,
  generateRandomHex
};
