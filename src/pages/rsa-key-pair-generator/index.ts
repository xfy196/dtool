import { Certificate } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.rsa-key-pair-generator.title'),
  path: '/rsa-key-pair-generator',
  description: translate('tools.rsa-key-pair-generator.description'),
  icon: Certificate,
  show: true,
  keywords: [
    'rsa-key-pair-generator',
    'rsa',
    'generator',
    'ras-key',
    'rsa-key-pair'
  ],
  component: () => import('./rsa-key-pair-generator.vue'),
  createdAt: new Date('2024-10-11')
});
