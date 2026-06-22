import { ReportMoney } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.rmb-converter.title'),
  path: '/rmb-converter',
  description: translate('tools.rmb-converter.description'),
  icon: ReportMoney,
  show: false,
  keywords: ['rmb', 'converter', 'rmb-converter'],
  component: () => import('./rmb-converter.vue'),
  createdAt: new Date('2026-06-19')
});
