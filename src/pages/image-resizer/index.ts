import { Resize } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';

export const tool = defineTool({
  name: translate('tools.image-resizer.title'),
  path: '/image-resizer',
  description: translate('tools.image-resizer.description'),
  icon: Resize,
  show: true,
  keywords: [
    'image',
    'resize',
    'dimensions',
    'scale',
    'width',
    'height',
    'image-resizer'
  ],
  component: () => import('./image-resizer.vue'),
  createdAt: new Date('2026-05-15')
});
