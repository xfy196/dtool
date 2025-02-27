import { Video } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.mp4-to-avi.title'),
  path: '/mp4-to-avi',
  description: translate('tools.mp4-to-avi.description'),
  icon: Video,
  show: true,
  keywords: ['mime', 'types', 'mp4-to-avi'],
  component: () => import('./mp4-to-avi.vue'),
  createdAt: new Date('2024-09-06')
});
