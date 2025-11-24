import { SwitchHorizontal } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';

export const tool = defineTool({
  name: translate('tools.table-converter.title'),
  path: '/table-converter',
  description: translate('tools.table-converter.description'),
  icon: SwitchHorizontal,
  show: true,
  keywords: [
    'table',
    'csv',
    'json',
    'markdown',
    'markdown-to-csv',
    'markdown-to-json',
    'table-converter'
  ],
  component: () => import('./table-converter.vue'),
  createdAt: new Date('2025-11-24')
});
