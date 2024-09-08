import { TextWrap } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.text-to-unicode.title'),
  path: '/text-to-unicode',
  description: translate('tools.text-to-unicode.description'),
  icon: TextWrap,
  show: true,
  keywords: ['text', 'unicode', 'text-to-unicode'],
  component: () => import('./text-to-unicode.vue'),
  createdAt: new Date('2024-09-07')
});
