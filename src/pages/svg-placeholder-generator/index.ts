import { PhotoSizeSelectActualOutlined } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.svg-placeholder-generator.title'),
  path: '/svg-placeholder-generator',
  description: translate('tools.svg-placeholder-generator.description'),
  icon: PhotoSizeSelectActualOutlined,
  show: true,
  keywords: ['svg', 'placeholder', 'svg-placeholder-generator'],
  component: () => import('./svg-placeholder-generator.vue'),
  createdAt: new Date('2024-10-18')
});
