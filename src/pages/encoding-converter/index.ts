import { FileDigit } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.encoding-converter.title'),
  path: '/encoding-converter',
  description: translate('tools.encoding-converter.description'),
  icon: FileDigit,
  show: true,
  keywords: ['gb2312', 'gbk', 'utf-8', 'encoding', 'chinese', 'hex'],
  component: () => import('./encoding-converter.vue'),
  createdAt: new Date('2026-05-15')
});
