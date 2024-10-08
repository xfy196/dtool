import { Menu2 } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.bip39-generator.title'),
  path: '/bip39-generator',
  description: translate('tools.bip39-generator.description'),
  icon: Menu2,
  show: true,
  keywords: ['string', 'bip39-generator'],
  component: () => import('./bip39-generator.vue'),
  createdAt: new Date('2024-10-08')
});
