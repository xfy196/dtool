import { Keyboard } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.keycode-info.title'),
  path: '/keycode-info',
  description: translate('tools.keycode-info.description'),
  icon: Keyboard,
  show: true,
  keywords: ['keycode', 'keycode-info', 'web', 'key-envent'],
  component: () => import('./keycode-info.vue'),
  createdAt: new Date('2024-09-07')
});
