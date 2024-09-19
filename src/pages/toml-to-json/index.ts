import { DataArrayFilled } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '../../plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.toml-to-json.title'),
  path: '/toml-to-json',
  description: translate('tools.toml-to-json.description'),
  icon: DataArrayFilled,
  keywords: ['toml', 'json', 'converter', 'toml to json'],
  show: true,
  component: () => import('./toml-to-json.vue'),
  createdAt: new Date('2024-09-08')
});
