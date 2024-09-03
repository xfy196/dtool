function passwordStrengthAnalyser(password: string) {
  let lowerCaseSize = 0;
  let upperCaseSize = 0;
  let numberSize = 0;
  let symbolSize = 0;
  for (let i = 0; i < password.length; i++) {
    if (password[i] >= "a" && password[i] <= "z") {
      lowerCaseSize++;
    } else if (password[i] >= "A" && password[i] <= "Z") {
      upperCaseSize++;
    } else if (password[i] >= "0" && password[i] <= "9") {
      numberSize++;
    } else {
      symbolSize++;
    }
  }
  const entropy = getEntropy(password);
  const score = (entropy / Math.log2(94)) * 100;
  return {
    length: password.length,
    lowerCaseSize: lowerCaseSize,
    upperCaseSize: upperCaseSize,
    numberSize: numberSize,
    symbolSize: symbolSize,
    entropy,
    score,
  };
}
//  计算熵值
function getEntropy(password: string) {
  const charsets: Record<string, string> = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: '!@#$%^&*(),.?":{}|<>]',
  };

  let entropy = 0;
  let frequency: Record<string, number> = {};

  // 初始化频率对象
  for (let charset in charsets) {
    charsets[charset].split("").forEach((char) => {
      frequency[char] = 0;
    });
  }

  // 计算密码中每个字符的出现频率
  for (let i = 0; i < password.length; i++) {
    let char = password[i];
    for (let charset in charsets) {
      if (charsets[charset].indexOf(char) !== -1) {
        frequency[char]++;
        break;
      }
    }
  }

  // 计算熵值
  for (let char in frequency) {
    if (frequency[char] > 0) {
      let probability = frequency[char] / password.length;
      entropy += probability * Math.log2(1 / probability);
    }
  }

  return entropy;
}
export { passwordStrengthAnalyser };
