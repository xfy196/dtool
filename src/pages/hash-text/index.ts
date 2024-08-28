import { EyeOff } from "@vicons/tabler";
import { defineTool } from "../tool";
import { translate } from "@/plugins/i18n.plugins";
export const tool = defineTool({
  name: translate("tools.hash-text.title"),
  path: "/hash-text",
  description: translate("tools.hash-text.description"),
  icon: EyeOff,
  keywords: ['hash', 'text'],
  component: () => import("./hash-text.vue"),
  createdAt: new Date("2024-08-28")
});
