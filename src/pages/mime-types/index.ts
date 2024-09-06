import { World } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.mime-types.title'),
  path: '/mime-types',
  description: translate('tools.mime-types.description'),
  icon: World,
  show: true,
  keywords: ['mime', 'types', 'mime-types'],
  component: () => import('./mime-types.vue'),
  createdAt: new Date('2024-09-06')
});
