import { defineStore } from "pinia";
import type { Tool, ToolCategory, ToolWithCategory } from "./tool.types";
import { toolsCategory, toolsWithCategory } from "./index";
import { computed, h, Ref } from "vue";
import { useI18n } from "vue-i18n";
import _ from "lodash";
import { translate } from "../plugins/i18n.plugins";
import { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";
import MenuIconItem from "../components/MenuIconItem.vue";
import { RemovableRef, useStorage } from "@vueuse/core";
const makeLabel = (tool: Tool) => () =>
  h(RouterLink, { to: tool.path }, { default: () => tool.name });
const makeIcon = (tool: Tool) => () => h(MenuIconItem, { tool });
export const useToolStore = defineStore("tools", () => {
  const favoriteToolsName = useStorage('favoriteToolsName', []) as Ref<string[]>;
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

  // 本地收藏的工具
  const favoriteTools = computed<ToolWithCategory[]>(() => {
    return tools.value.filter((tool: ToolWithCategory) => {
      const _function: string = tool.path.replace(/\//g, "");
      return favoriteToolsName.value.includes(_function);
    });
  });

  // 加入收藏
  const addToolToFavorite = (name: string) => {
    favoriteToolsName.value.push(name)
  }
  // 取消收藏
  const removeToolFromFavorite = (name: string) => {
    favoriteToolsName.value = favoriteToolsName.value.filter((toolName) => toolName !== name)
  }
  // 判断是否收藏
  const isFavorite = (name: string) => {
    return favoriteToolsName.value.includes(name)
  }

  /**
   * @description: 左侧菜单树数据结构处理
   * @author 小小荧 <xfy196@outlook.com>
   * @param {string} []
   * @return {void}
   * @date 2024-08-26 17:34
   */
  const menuTools = computed<MenuOption[]>(() => {
    return toolsCategory.map((tool: ToolCategory) => {
      const key = tool.name;
      const icon = () => h(tool.icon);
      const label = translate(`tools.${tool.name.toLocaleLowerCase()}`);
      let children = tool.components.map((ctool) => {
        const toolI18nKey = ctool.path.replace(/\//g, "");
        ctool.name = t(`tools.${toolI18nKey}.title`, ctool.name);
        return {
          key: ctool.path,
          label: makeLabel(ctool),
          icon: makeIcon(ctool),
        };
      });
      return {
        key,
        label,
        icon,
        children,
      };
    }) as MenuOption[];
  });

  return {
    tools,
    menuTools,
    favoriteTools,
    addToolToFavorite,
    removeToolFromFavorite,
    isFavorite
  };
});
