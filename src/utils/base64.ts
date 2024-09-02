import { encode, decode, isValid } from "js-base64";

function textToBase64(
  text: string,
  { urlSafe = false }: { urlSafe?: boolean }
) {
  console.log("🚀 ~ urlSafe:", urlSafe)
  return encode(text);
}
function base64ToText(
  text: string,
  { urlSafe = false }: { urlSafe?: boolean }
) {
  console.log("🚀 ~ urlSafe:", urlSafe)
  return decode(text);
}
function isBase64(text: string) {
  return isValid(text);
}
function removePotentialDataAndMimePrefix(text: string){
    return text.replace(/^data:.*?;base64,/, "");
}
export { textToBase64, isBase64, base64ToText, removePotentialDataAndMimePrefix };
