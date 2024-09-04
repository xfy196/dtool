import { ColorLensOutlined } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.color-converter.title'),
  path: '/color-converter',
  description: translate('tools.color-converter.description'),
  icon: ColorLensOutlined,
  show: true,
  keywords: ['color', 'color-selector', 'color-picker', 'color-converter'],
  component: () => import('./color-converter.vue'),
  createdAt: new Date('2024-09-02')
});
