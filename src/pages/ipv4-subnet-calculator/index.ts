import { Router } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.ipv4-subnet-calculator.title'),
  path: '/ipv4-subnet-calculator',
  description: translate('tools.ipv4-subnet-calculator.description'),
  icon: Router,
  show: true,
  keywords: ['ipv4', 'subnet', 'ipv4-subnet-calculator'],
  component: () => import('./ipv4-subnet-calculator.vue'),
  createdAt: new Date('2025-10-21')
});
