import { SwitchHorizontal } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.simplified-and-complex-converter.title'),
  path: '/simplified-and-complex-converter',
  description: translate('tools.simplified-and-complex-converter.description'),
  icon: SwitchHorizontal,
  show: true,
  keywords: ['base64', 'file', 'simplified-and-complex-converter'],
  component: () => import('./simplified-and-complex-converter.vue'),
  createdAt: new Date('2025-07-14')
});
