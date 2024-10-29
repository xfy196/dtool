import { ImageOutlined } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.placeholder.title'),
  path: '/placeholder',
  description: translate('tools.placeholder.description'),
  icon: ImageOutlined,
  show: true,
  link: 'https://placehold.dtool.tech/',
  keywords: ['placeholder'],
  createdAt: new Date('2024-10-29')
});
