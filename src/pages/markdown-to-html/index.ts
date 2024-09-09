import { Markdown } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '../../plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.markdown-to-html.title'),
  path: '/markdown-to-html',
  description: translate('tools.json.description'),
  icon: Markdown,
  keywords: ['markdown', 'html', 'converter', 'markdown to html'],
  show: true,
  component: () => import('./markdown-to-html.vue'),
  createdAt: new Date('2024-09-09')
});
