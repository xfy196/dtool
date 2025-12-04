import { Json } from '@vicons/carbon';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.mock-data.title'),
  path: '/mock-data',
  description: translate('tools.mock-data.description'),
  icon: Json,
  show: true,
  keywords: ['mime', 'types', 'mock-data'],
  component: () => import('./mock-data.vue'),
  createdAt: new Date('2025-12-04')
});
