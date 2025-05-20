import { FileText } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.text-statistics.title'),
  path: '/text-statistics',
  description: translate('tools.text-statistics.description'),
  icon: FileText,
  show: true,
  keywords: [
    'statistics',
    'text',
    'text-statistics',
    'string',
    'text statistics'
  ],
  component: () => import('./text-statistics.vue'),
  createdAt: new Date('2025-05-20')
});
