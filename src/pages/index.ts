import { tool as uuidGenerator } from "./uuid-generator";
import { tool as ulidGenerator } from "./ulid-generator";
import { ToolCategory } from "./tool.types.ts";
import { EnhancedEncryptionFilled } from "@vicons/material";
export const toolsCategory: ToolCategory[] = [
  {
    name: "Crypto",
    icon: EnhancedEncryptionFilled,
    components: [uuidGenerator, ulidGenerator],
  },
];
export const tools = toolsCategory.flatMap(({ components }) => components);
export const toolsWithCategory = toolsCategory.flatMap(({ components, name }) =>
  components.map((tool) => ({ category: name, ...tool }))
);
