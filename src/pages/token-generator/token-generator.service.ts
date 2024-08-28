import { shuffleString } from "@/utils/random";

function createToken({
  upperCase = true,
  lowerCase = true,
  number = true,
  symbol = true,
  length = 24,
  alphabet,
}: {
  upperCase?: boolean;
  lowerCase?: boolean;
  number?: boolean;
  symbol?: boolean;
  length?: number;
  alphabet?: string;
}) {
  const allAlphabet =
    alphabet ??
    [
      upperCase ? "ABCDEFGHIJKLMOPQRSTUVWXYZ" : "",
      lowerCase ? "abcdefghijklmopqrstuvwxyz" : "",
      number ? "0123456789" : "",
      symbol ? ".,;:!?./-\"'#{([-|\\@)]=}*+" : "",
    ].join("");

  return shuffleString(allAlphabet.repeat(length)).substring(0, length);
}
export { createToken };
