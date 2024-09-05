import { FileDigit } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.base64-file-converter.title'),
  path: '/base64-file-converter',
  description: translate('tools.base64-file-converter.description'),
  icon: FileDigit,
  show: true,
  keywords: ['base64', 'file', 'base64-file-converter'],
  component: () => import('./base64-file-converter.vue'),
  createdAt: new Date('2024-09-05')
});
