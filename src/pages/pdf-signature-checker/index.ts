import { DocumentPdf } from '@vicons/carbon';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.pdf-signature-checker.title'),
  path: '/pdf-signature-checker',
  description: translate('tools.pdf-signature-checker.description'),
  icon: DocumentPdf,
  show: true,
  keywords: [
    'pdf-signature-checker',
    'pdf',
    'signature',
    'checker',
    'pdf-signature'
  ],
  component: () => import('./pdf-signature-checker.vue'),
  createdAt: new Date('2024-10-12')
});
