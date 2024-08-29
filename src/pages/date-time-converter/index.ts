import { Calendar } from "@vicons/tabler";
import { defineTool } from "../tool";
import { translate } from "@/plugins/i18n.plugins";
export const tool = defineTool({
  name: translate("tools.date-time-converter.title"),
  path: "/date-time-converter",
  description: translate("tools.date-time-converter.description"),
  icon: Calendar,
  show: false,
  keywords: ["date", "converter", "time", "datetime", "timestamp"],
  component: () => import("./date-time-converter.vue"),
  createdAt: new Date("2024-08-29"),
});
