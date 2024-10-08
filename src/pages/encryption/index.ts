import { Lock } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.encryption.title'),
  path: '/encryption',
  description: translate('tools.encryption.description'),
  icon: Lock,
  show: true,
  keywords: ['encryption', 'encrypt', 'decrypt'],
  component: () => import('./encryption.vue'),
  createdAt: new Date('2024-10-08')
});
