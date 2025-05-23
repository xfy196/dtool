import { EmojiEmotionsOutlined } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.emoji-picker.title'),
  path: '/emoji-picker',
  description: translate('tools.emoji-picker.description'),
  icon: EmojiEmotionsOutlined,
  show: true,
  keywords: ['emoji-picker', 'device', 'information', 'browser'],
  component: () => import('./emoji-picker.vue'),
  createdAt: new Date('2024-09-06')
});
