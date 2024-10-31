import { Edit } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.html-wysiwyg-editor.title'),
  path: '/html-wysiwyg-editor',
  description: translate('tools.html-wysiwyg-editor.description'),
  icon: Edit,
  show: true,
  keywords: [
    'html-wysiwyg-editor',
    'html',
    'What you see is what you get',
    'editor'
  ],
  component: () => import('./html-wysiwyg-editor.vue'),
  createdAt: new Date('2024-10-31')
});
