import { DeviceDesktopAnalytics } from "@vicons/tabler";
import { defineTool } from "../tool";
import { translate } from "@/plugins/i18n.plugins";
export const tool = defineTool({
  name: translate("tools.password-strength-analyser.title"),
  path: "/password-strength-analyser",
  description: translate("tools.password-strength-analyser.description"),
  icon: DeviceDesktopAnalytics,
  show: true,
  keywords: ["password", "strength", "analyser", "password-strength-analyser"],
  component: () => import("./password-strength-analyser.vue"),
  createdAt: new Date("2024-08-31"),
});
