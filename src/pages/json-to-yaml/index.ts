import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '../../plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.json-to-yaml.title'),
  path: '/json-to-yaml',
  description: translate('tools.json.description'),
  icon: Braces,
  keywords: ['yaml', 'json', 'converter', 'yaml to json'],
  show: true,
  component: () => import('./json-to-yaml.vue'),
  createdAt: new Date('2024-09-08')
});
