import { Unlink } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '../../plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.url-parser.title'),
  path: '/url-parser',
  description: translate('tools.url-parser.description'),
  icon: Unlink,
  show: true,
  keywords: ['uuid'],
  component: () => import('./url-parser.vue'),
  createdAt: new Date('2024-10-14')
});
