import { Qrcode } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.qrcode-generator.title'),
  path: '/qrcode-generator',
  description: translate('tools.qrcode-generator.description'),
  icon: Qrcode,
  show: true,
  keywords: ['qr', 'qrcode', 'qrcode-generator'],
  component: () => import('./qrcode-generator.vue'),
  createdAt: new Date('2024-10-17')
});
