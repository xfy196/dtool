import { Keyboard } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.loan-calculator.title'),
  path: '/loan-calculator',
  description: translate('tools.loan-calculator.description'),
  icon: Keyboard,
  show: true,
  keywords: ['loan', 'loan-calculator', 'calculator'],
  component: () => import('./loan-calculator.vue'),
  createdAt: new Date('2026-06-16')
});
