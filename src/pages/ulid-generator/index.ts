import { SortAscendingNumbers } from "@vicons/tabler";
import { defineTool } from "../tool";
import { translate } from "../../plugins/i18n.plugins";
export const tool = defineTool({
  name: translate("tools.ulid-generator.title"),
  path: "/ulid-generator",
  description: translate("tools.ulid-generator.description"),
  icon: SortAscendingNumbers,
  keywords: ['ulid'],
  component: () => import("./ulid-generator.vue"),
  createdAt: new Date("2024-08-17")
});
