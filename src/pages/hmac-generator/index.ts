import { Menu } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.hmac-generator.title'),
  path: '/hmac-generator',
  description: translate('tools.hmac-generator.description'),
  icon: Menu,
  show: true,
  keywords: ['hmac-generator', 'hmac', 'generator', 'hash'],
  component: () => import('./hmac-generator.vue'),
  createdAt: new Date('2024-10-10')
});
