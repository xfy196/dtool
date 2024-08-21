import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { Tool, ToolCategory, ToolWithCategory } from "./tool.types";
import { toolsWithCategory } from "./index";
import { Ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import _ from "lodash";
export const useToolStore = defineStore("tools", () => {
  const favoriteToolsName = useStorage("favoriteToolsName", []) as Ref<
    string[]
  >;
  const { t } = useI18n();
  const tools = computed<ToolWithCategory[]>(() =>
    toolsWithCategory.map((tool) => {
      const toolI18nKey = tool.path.replace(/\//g, "");

      return {
        ...tool,
        name: t(`tools.${toolI18nKey}.title`, tool.name),
        description: t(`tools.${toolI18nKey}.description`, tool.description),
        category: t(
          `tools.categories.${tool.category.toLowerCase()}`,
          tool.category
        ),
      };
    })
  );

  // 生成带分类的数据结构
  const toolsByCategory = computed<ToolCategory[]>(() => {
    return _.chain(tools.value)
    .groupBy("category")
    .map((components, name) => ({
      name,
      components,
    }))
    .value();
  });
  return {
    tools,
    toolsByCategory
  };
});
