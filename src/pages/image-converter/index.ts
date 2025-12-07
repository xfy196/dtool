import { ImageFilled } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugins';
export const tool = defineTool({
  name: translate('tools.image-converter.title'),
  path: '/image-converter',
  description: translate('tools.image-converter.description'),
  icon: ImageFilled,
  show: true,
  keywords: [
    'image-converter',
    'image',
    'converter',
    'image-to-base64',
    'base64-to-image',
    'png-to-jpg',
    'jpg-to-png',
    'jpeg-to-png',
    'png-to-jpeg',
    'jpg-to-webp',
    'webp-to-jpg',
    'webp-to-png',
    'png-to-webp',
    'webp-to-png',
    'jpeg-to-webp',
    'webp-to-jpeg',
    'jpeg-to-png',
    'png-to-jpeg',
    'jpg-to-webp',
    'webp-to-jpg'
  ],
  component: () => import('./image-converter.vue'),
  createdAt: new Date('2025-12-07')
});
