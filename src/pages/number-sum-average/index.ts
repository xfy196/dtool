import { Calculator } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';

export const tool = defineTool({
  name: translate('tools.number-sum-average.title'),
  path: '/number-sum-average',
  description: translate('tools.number-sum-average.description'),
  icon: Calculator,
  show: true,
  keywords: ['number', 'sum', 'average', 'calculator', 'statistics'],
  component: () => import('./number-sum-average.vue'),
  createdAt: new Date('2026-08-04')
});
