import { Fingerprint } from "@vicons/tabler";
import { defineTool } from "../tool";
export const tool = defineTool({
  name: "UUID生成器",
  path: "/uuid-generator",
  description: "UUID生成器",
  icon: Fingerprint,
  keywords: ['uuid'],
  component: () => import("./uuid-generator.vue"),
  createdAt: new Date("2024-08-17")
});
