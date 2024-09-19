import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '../../plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.json-to-toml.title'),
  path: '/json-to-toml',
  description: translate('tools.json-to-toml.description'),
  icon: Braces,
  keywords: ['toml', 'json', 'converter', 'json to toml'],
  show: true,
  component: () => import('./json-to-toml.vue'),
  createdAt: new Date('2024-09-19')
});
