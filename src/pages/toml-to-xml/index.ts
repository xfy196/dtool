import { DataArrayFilled } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '../../plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.toml-to-xml.title'),
  path: '/toml-to-xml',
  description: translate('tools.toml-to-xml.description'),
  icon: DataArrayFilled,
  keywords: ['toml', 'json', 'converter', 'toml to xml', 'xml'],
  show: true,
  component: () => import('./toml-to-xml.vue'),
  createdAt: new Date('2024-09-19')
});
