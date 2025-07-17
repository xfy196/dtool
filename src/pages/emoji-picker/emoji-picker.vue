<template>
  <div class="mx-auto max-w-[2400px]" style="flex: 1">
    <div class="flex mx-auto max-w-[600px] items-center justify-center gap-3">
      <n-input-group>
        <n-button ghost>
          <n-icon>
            <Search />
          </n-icon>
        </n-button>
        <n-input
          @input="handleInput"
          v-model:value="keyword"
          type="text"
          placeholder="Search emoji"
        />
      </n-input-group>
    </div>
    <div v-for="{ group, emojiInfos } in emojisGroups" :key="group">
      <div class="mt-4 text-[20px] font-bold">{{ group }}</div>
      <div
        class="grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-6"
      >
        <n-card
          content-class="box-border w-full"
          :content-style="{
            padding: '6px'
          }"
          class="flex items-center gap-3"
          v-for="emojiInfo in emojiInfos"
          :key="emojiInfo.name"
        >
          <n-flex :wrap="false" align="center" class="w-full h-full">
            <div
              @click.stop="
                copy(emojiInfo.emoji, {
                  notificationMessage: `${emojiInfo.emoji} copied to clipboard`
                })
              "
              class="text-2xl truncate cursor-pointer whitespace-nowrap"
            >
              {{ emojiInfo.emoji }}
            </div>
            <n-flex class="flex-1 min-w-0 trauncate" vertical>
              <n-popover trigger="hover">
                <template #trigger>
                  <div class="flex-1 min-w-0 font-bold truncate">
                    {{ emojiInfo.title }}
                  </div>
                </template>
                <span>{{ emojiInfo.title }}</span>
              </n-popover>
              <n-flex :wrap="false">
                <n-popover trigger="hover">
                  <template #trigger>
                    <n-button
                      @click.stop="
                        copy(emojiInfo.codePoints, {
                          notificationMessage: `${emojiInfo.codePoints} copied to clipboard`
                        })
                      "
                      text
                      >{{ emojiInfo.codePoints }}</n-button
                    >
                  </template>
                  <span>{{ emojiInfo.codePoints }}</span>
                </n-popover>
                <n-popover trigger="hover">
                  <template #trigger>
                    <n-button
                      @click.stop="
                        copy(emojiInfo.unicode, {
                          notificationMessage: `${emojiInfo.unicode} copied to clipboard`
                        })
                      "
                      text
                      class="flex-1 truncate"
                      >{{ emojiInfo.unicode }}</n-button
                    >
                  </template>
                  <span>{{ emojiInfo.unicode }}</span>
                </n-popover>
              </n-flex>
            </n-flex>
          </n-flex>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Search } from '@vicons/tabler';

  import emojiUnicodeData from 'unicode-emoji-json';
  import emojiKeywords from 'emojilib';
  import _ from 'lodash';
  import { EmojiInfo } from './emoji.types';
  import { useCopy } from '@/composable/copy';
  import { ref } from 'vue';
  import { useDebounceFn } from '@vueuse/core';
  import { onMounted } from 'vue';
  const keyword = ref('');
  const { copy } = useCopy({});
  const escapeUnicode = ({ emoji }: { emoji: string }) => {
    return emoji
      .split('')
      .map((unit) => `\\u${unit.charCodeAt(0).toString(16).padStart(4, '0')}`)
      .join('');
  };

  const getEmojiCodePoints = ({ emoji }: { emoji: string }) => {
    return emoji.codePointAt(0)
      ? `0x${emoji.codePointAt(0)?.toString(16)}`
      : undefined;
  };
  const emojisGroups = ref<{ emojiInfos: EmojiInfo[]; group: string }[]>([]);
  const emojis = _.map(emojiUnicodeData, (emojiInfo, emoji) => {
    return {
      ...emojiInfo,
      emoji,
      title: _.capitalize(emojiInfo.name),
      keywords: emojiKeywords[emoji as keyof typeof emojiKeywords],
      codePoints: getEmojiCodePoints({ emoji }),
      unicode: escapeUnicode({ emoji })
    };
  });
  const groupEmojis = () => {
    emojisGroups.value = _.chain(emojis)
      .filter((emojiInfo) => {
        return emojiInfo.name?.includes(keyword.value);
      })
      .groupBy('group')
      .map((emojiInfos, group) => ({ emojiInfos, group }))
      .value();
  };
  onMounted(() => {
    groupEmojis();
  });
  const handleInput = useDebounceFn(() => {
    groupEmojis();
  }, 500);
</script>
<style lang="scss" scoped></style>
