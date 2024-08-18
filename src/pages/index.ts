import { tool as uuidGenerator } from "./uuid-generator";
import { ToolCategory } from "./tool.types";
export const toolsCategory: ToolCategory[] = [
  {
    name: "Crypto",
    components: [uuidGenerator],
  },
];
export const tools = toolsCategory.flatMap(({ components }) => components);
export const toolsWithCategory = toolsCategory.flatMap(({ components, name }) =>
  components.map((tool) => ({ category: name, ...tool }))
);
