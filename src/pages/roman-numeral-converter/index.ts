import { LetterX } from "@vicons/tabler";
import { defineTool } from "../tool";
import { translate } from "@/plugins/i18n.plugins";
export const tool = defineTool({
  name: translate("tools.roman-numeral-converter.title"),
  path: "/roman-numeral-converter",
  description: translate("tools.roman-numeral-converter.description"),
  icon: LetterX,
  show: true,
  keywords: ["roman", "numeral", "converter", "roman-numeral-converter"],
  component: () => import("./roman-numeral-converter.vue"),
  createdAt: new Date("2024-09-03"),
});
