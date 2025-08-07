import { ArrowSwap20Regular } from '@vicons/fluent';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.json-diff.title'),
  path: '/json-diff',
  description: translate('tools.json-diff.description'),
  icon: ArrowSwap20Regular,
  show: false,
  keywords: ['integer', 'int', 'converter'],
  component: () => import('./json-diff.vue'),
  createdAt: new Date('2024-08-31')
});
