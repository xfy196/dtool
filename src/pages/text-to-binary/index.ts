import { Binary } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.text-to-binary.title'),
  path: '/text-to-binary',
  description: translate('tools.text-to-binary.description'),
  icon: Binary,
  show: true,
  keywords: ['text', 'text-to-binary'],
  component: () => import('./text-to-binary.vue'),
  createdAt: new Date('2025-02-20')
});
