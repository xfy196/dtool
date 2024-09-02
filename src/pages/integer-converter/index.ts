import { ArrowSwap20Regular } from "@vicons/fluent";
import { defineTool } from "../tool";
import { translate } from "@/plugins/i18n.plugins";
export const tool = defineTool({
  name: translate("tools.integer-converter.title"),
  path: "/integer-converter",
  description: translate("tools.integer-converter.description"),
  icon: ArrowSwap20Regular,
  show: true,
  keywords: ["integer", "int", "converter"],
  component: () => import("./integer-converter.vue"),
  createdAt: new Date("2024-08-31"),
});
