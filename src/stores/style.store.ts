import { useMediaQuery, useStorage, useDark, useToggle } from "@vueuse/core";
import { defineStore } from "pinia";
import { Ref, watch } from "vue";

export const useStyleStore = defineStore("style", {
  state: () => {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    const isSmallScreen = useMediaQuery("(max-width: 768px)");
    const collapsed = useStorage(
      "collapsed",
      isSmallScreen.value
    ) as Ref<boolean>;
    watch(isSmallScreen, (v) => (collapsed.value = v));
    return {
      isDark,
      toggleDark,
      isSmallScreen,
      collapsed,
    };
  },
});
