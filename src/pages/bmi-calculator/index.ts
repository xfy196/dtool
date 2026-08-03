import { Activity } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';

export const tool = defineTool({
  name: translate('tools.bmi-calculator.title'),
  path: '/bmi-calculator',
  description: translate('tools.bmi-calculator.description'),
  icon: Activity,
  show: true,
  keywords: ['bmi', 'calculator', 'body', 'mass', 'index'],
  component: () => import('./bmi-calculator.vue'),
  createdAt: new Date('2026-08-03')
});
