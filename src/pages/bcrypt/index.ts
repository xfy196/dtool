import { LockSquare } from "@vicons/tabler";
import { defineTool } from "../tool";
import { translate } from "@/plugins/i18n.plugins";
export const tool = defineTool({
  name: translate("tools.bcrypt.title"),
  path: "/bcrypt",
  description: translate("tools.bcrypt.description"),
  icon: LockSquare,
  show: true,
  keywords: ["string", "bcrypt"],
  component: () => import("./bcrypt.vue"),
  createdAt: new Date("2024-09-03"),
});
