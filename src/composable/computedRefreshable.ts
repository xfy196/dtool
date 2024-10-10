import { computedAsync, watchThrottled } from '@vueuse/core';
import { watch, computed, ref } from 'vue';

function computedRefreshable<T>(
  getter: () => T,
  { throttle }: { throttle?: number; immediate?: boolean } = {}
) {
  const dirty = ref<boolean>(true);
  const update = () => {
    dirty.value = true;
  };
  let value: T;

  if (throttle) {
    watchThrottled(getter, update, { throttle });
  } else {
    watch(getter, update);
  }

  const computedValue = computed(() => {
    if (dirty.value) {
      value = getter();
      dirty.value = false;
    }
    return value;
  });

  return [computedValue, update] as const;
}

function computedRefreshableAsync<T>(
  getter: () => Promise<T>,
  defaultValue?: T
) {
  const dirty = ref<boolean>(true);
  let value: T;
  const update = () => (dirty.value = true);
  watch(getter, update);
  const computedValue = computedAsync(async () => {
    if (dirty.value) {
      value = await getter();
      dirty.value = false;
    }
    return value;
  }, defaultValue);
  return [computedValue, update] as const;
}
export { computedRefreshable, computedRefreshableAsync };
