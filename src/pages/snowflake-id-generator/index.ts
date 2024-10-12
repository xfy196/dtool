import { Id } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.snowflake-id-generator.title'),
  path: '/snowflake-id-generator',
  description: translate('tools.snowflake-id-generator.description'),
  icon: Id,
  show: true,
  keywords: [
    'snowflake-id-generator',
    'snowflake',
    'generator',
    'id',
    'random',
    'snowflake-id'
  ],
  component: () => import('./snowflake-id-generator.vue'),
  createdAt: new Date('2024-10-12')
});
