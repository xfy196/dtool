import { ArrowsShuffle } from "@vicons/tabler";
import { defineTool } from "../tool";
import { translate } from "../../plugins/i18n.plugins";
export const tool = defineTool({
  name: translate("tools.token-generator.title"),
  path: "/token-generator",
  description: translate("tools.token-generator.description"),
  icon: ArrowsShuffle,
  show: true,
  keywords: ['token', 'pasword'],
  component: () => import("./token-generator.vue"),
  createdAt: new Date("2024-08-27")
});
