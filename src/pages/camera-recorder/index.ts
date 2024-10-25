import { Camera } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '../../plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.camera-recorder.title'),
  path: '/camera-recorder',
  description: translate('tools.camera-recorder.description'),
  icon: Camera,
  keywords: [
    'camera',
    'video',
    'audio',
    'converter',
    'video to audio',
    'audio to video'
  ],
  show: true,
  component: () => import('./camera-recorder.vue'),
  createdAt: new Date('2024-10-18')
});
