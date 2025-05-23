import { FileDiff } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.text-diff.title'),
  path: '/text-diff',
  description: translate('tools.text-diff.description'),
  icon: FileDiff,
  show: true,
  keywords: [
    'diff',
    'text',
    'text-diff',
    'compare',
    'string',
    'code',
    'text diff'
  ],
  component: () => import('./text-diff.vue'),
  createdAt: new Date('2025-05-20')
});
