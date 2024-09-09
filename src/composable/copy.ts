import { useClipboard } from '@vueuse/core';
import { useMessage } from 'naive-ui';
import { MaybeRefOrGetter } from 'vue';

export function useCopy({
  source,
  text = 'Copied to the clipboard',
  errText = 'Failed to copy to the clipboard',
  isToast = true
}: {
  source?: MaybeRefOrGetter<string>;
  text?: string;
  errText?: string;
  isToast?: boolean;
}) {
  const { copy, ...rest } = useClipboard({ source, legacy: true });
  const message = useMessage();

  return {
    ...rest,
    async copy(
      content?: string,
      {
        notificationMessage,
        errMessage
      }: { notificationMessage?: string; errMessage?: string } = {}
    ) {
      try {
        if (source) {
          await copy();
        } else {
          await copy(content);
        }
        if (isToast) {
          message.success(notificationMessage ?? text);
        }
      } catch (error) {
        if (isToast) {
          message.error(errMessage ?? errText);
        }
      }
    }
  };
}
