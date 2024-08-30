import { SplitscreenFilled } from "@vicons/material";
import { defineTool } from "../tool";
import { translate } from "@/plugins/i18n.plugins";
export const tool = defineTool({
  name: translate("tools.str-split.title"),
  path: "/str-split",
  description: translate("tools.str-split.description"),
  icon: SplitscreenFilled,
  show: true,
  keywords: ["string", "str", "text", "split"],
  component: () => import("./str-split.vue"),
  createdAt: new Date("2024-08-28"),
});
