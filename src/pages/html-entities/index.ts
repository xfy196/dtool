import { Code } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.html-entities.title'),
  path: '/html-entities',
  description: translate('tools.html-entities.description'),
  icon: Code,
  show: true,
  keywords: ['html-entities', 'html', 'entities'],
  component: () => import('./html-entities.vue'),
  createdAt: new Date('2025-01-08')
});
