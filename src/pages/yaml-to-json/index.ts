import { DataArrayFilled } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '../../plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.yaml-to-json.title'),
  path: '/yaml-to-json',
  description: translate('tools.yaml-to-json.description'),
  icon: DataArrayFilled,
  keywords: ['yaml', 'json', 'converter', 'yaml to json'],
  show: true,
  component: () => import('./yaml-to-json.vue'),
  createdAt: new Date('2024-09-08')
});
