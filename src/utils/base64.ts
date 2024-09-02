import {
  encode,
  decode,
  isValid,
  toUint8Array,
  fromUint8Array,
} from "js-base64";

function textToBase64(
  text: string,
  { urlSafe = false }: { urlSafe?: boolean }
) {
  const encodeText = encode(text);
  return urlSafe ? makeUrlSafe(encodeText) : encodeText;
}
function base64ToText(
  text: string,
  { urlSafe = false }: { urlSafe?: boolean }
) {
  if (!isBase64(text, { urlSafe })) {
    throw new Error("Invalid base64 string");
  }
  let cleanStr = removePotentialDataAndMimePrefix(text);
  if (urlSafe) {
    cleanStr = unURL(cleanStr);
  }
  try {
    return decode(cleanStr);
  } catch (error) {
    throw new Error("Invalid base64 string");
  }
}
function isBase64(text: string, { urlSafe = false }: { urlSafe?: boolean }) {
  // 清除data，base64前缀
  let cleanStr = removePotentialDataAndMimePrefix(text);
  if (urlSafe) {
    cleanStr = unURL(cleanStr);
  }
  try {
    const reEncodeBase64 = fromUint8Array(toUint8Array(cleanStr));
    if (urlSafe) {
      return removePotentialPadding(reEncodeBase64) === cleanStr;
    }
    return reEncodeBase64 === cleanStr.replace(/\s/g, "");
  } catch (error) {
    return false;
  }
  return isValid(text);
}
function removePotentialDataAndMimePrefix(text: string) {
  return text.replace(/^data:.*?;base64,/, "");
}
function makeUrlSafe(text: string) {
  return text.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function removePotentialPadding(text: string) {
  return text.replace(/=/g, "");
}
function unURL(text: string): string {
  return text
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .replace(/[^A-Za-z0-9+/]/g, "");
}
export {
  textToBase64,
  isBase64,
  base64ToText,
  removePotentialDataAndMimePrefix,
  removePotentialPadding,
};
