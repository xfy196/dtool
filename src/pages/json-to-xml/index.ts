import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '../../plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.json-to-xml.title'),
  path: '/json-to-xml',
  description: translate('tools.json-to-xml.description'),
  icon: Braces,
  keywords: ['xml', 'json', 'converter', 'json to xml'],
  show: true,
  component: () => import('./json-to-xml.vue'),
  createdAt: new Date('2024-09-08')
});
