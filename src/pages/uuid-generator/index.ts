import { Fingerprint } from "@vicons/tabler";
import { defineTool } from "../tool";
import { translate } from "../../plugins/i18n.plugins";
export const tool = defineTool({
  name: translate("tools.uuid-generator.title"),
  path: "/uuid-generator",
  description: translate("tools.uuid-generator.description"),
  icon: Fingerprint,
  show: true,
  keywords: ['uuid'],
  component: () => import("./uuid-generator.vue"),
  createdAt: new Date("2024-08-17")
});
