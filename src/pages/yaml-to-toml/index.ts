import { DataArrayFilled } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '../../plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.yaml-to-toml.title'),
  path: '/yaml-to-toml',
  description: translate('tools.yaml-to-toml.description'),
  icon: DataArrayFilled,
  keywords: ['yaml', 'toml', 'converter', 'yaml to toml'],
  show: true,
  component: () => import('./yaml-to-toml.vue'),
  createdAt: new Date('2024-09-20')
});
