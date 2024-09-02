import { FileDigit } from "@vicons/tabler";
import { defineTool } from "../tool";
import { translate } from "@/plugins/i18n.plugins";
export const tool = defineTool({
  name: translate("tools.base64-string-converter.title"),
  path: "/base64-string-converter",
  description: translate("tools.base64-string-converter.description"),
  icon: FileDigit,
  show: true,
  keywords: ["base64", "string", "base64-string-converter"],
  component: () => import("./base64-string-converter.vue"),
  createdAt: new Date("2024-09-02"),
});
