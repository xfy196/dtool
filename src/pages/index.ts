import { tool as uuidGenerator } from "./uuid-generator";
import { tool as ulidGenerator } from "./ulid-generator";
import { tool as tokenGenerator } from "./token-generator";
import { tool as hashText } from "./hash-text";
import { tool as dateConverter } from "./date-time-converter";
import { ToolCategory } from "./tool.types.ts";
import { ConvertRange20Regular } from "@vicons/fluent";
import { Lock } from "@vicons/tabler";
export const toolsCategory: ToolCategory[] = [
  {
    name: "Crypto",
    icon: Lock,
    show: true,
    components: [hashText, uuidGenerator, ulidGenerator, tokenGenerator],
  },
  {
    name: "Converter",
    show: true,
    icon: ConvertRange20Regular,
    components: [dateConverter],
  },
];
export const tools = toolsCategory.flatMap(({ components }) => components);
export const toolsWithCategory = toolsCategory.flatMap(({ components, name }) =>
  components.map((tool) => ({ category: name, ...tool }))
);
