import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '../../plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.xml-to-json.title'),
  path: '/xml-to-json',
  description: translate('tools.xml-to-json.description'),
  icon: Braces,
  keywords: ['xml', 'json', 'converter', 'xml to json'],
  show: true,
  component: () => import('./xml-to-json.vue'),
  createdAt: new Date('2024-09-08')
});
