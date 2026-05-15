import { FileDigit } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.gb2312-converter.title'),
  path: '/gb2312-converter',
  description: translate('tools.gb2312-converter.description'),
  icon: FileDigit,
  show: true,
  keywords: ['gb2312', 'gbk', 'encoding', 'chinese', 'hex'],
  component: () => import('./gb2312-converter.vue'),
  createdAt: new Date('2026-05-15')
});
