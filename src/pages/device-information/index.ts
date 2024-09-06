import { DeviceLaptop } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.device-information.title'),
  path: '/device-information',
  description: translate('tools.device-information.description'),
  icon: DeviceLaptop,
  show: false,
  keywords: ['device-information', 'device', 'information', 'browser'],
  component: () => import('./device-information.vue'),
  createdAt: new Date('2024-09-06')
});
