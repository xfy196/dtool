import { LetterCaseToggle } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.case-converter.title'),
  path: '/case-converter',
  description: translate('tools.case-converter.description'),
  icon: LetterCaseToggle,
  show: true,
  keywords: ['case', 'case-converter', 'camelCase', 'capitalCase'],
  component: () => import('./case-converter.vue'),
  createdAt: new Date('2024-09-04')
});
