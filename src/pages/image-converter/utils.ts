export type ImageFormat = 'jpg' | 'png' | 'webp' | 'svg';

export type ConversionType = {
  label: string;
  value: string;
  from: ImageFormat;
  to: ImageFormat;
  accept: string;
  mimeType: string;
};

// 支持的转换类型配置
export const conversionTypes: ConversionType[] = [
  {
    label: 'JPG 转 PNG',
    value: 'jpg-to-png',
    from: 'jpg',
    to: 'png',
    accept: '.jpg,.jpeg,image/jpeg',
    mimeType: 'image/png'
  },
  {
    label: 'PNG 转 JPG',
    value: 'png-to-jpg',
    from: 'png',
    to: 'jpg',
    accept: '.png,image/png',
    mimeType: 'image/jpeg'
  },
  {
    label: 'JPG 转 WebP',
    value: 'jpg-to-webp',
    from: 'jpg',
    to: 'webp',
    accept: '.jpg,.jpeg,image/jpeg',
    mimeType: 'image/webp'
  },
  {
    label: 'PNG 转 WebP',
    value: 'png-to-webp',
    from: 'png',
    to: 'webp',
    accept: '.png,image/png',
    mimeType: 'image/webp'
  },
  {
    label: 'WebP 转 JPG',
    value: 'webp-to-jpg',
    from: 'webp',
    to: 'jpg',
    accept: '.webp,image/webp',
    mimeType: 'image/jpeg'
  },
  {
    label: 'WebP 转 PNG',
    value: 'webp-to-png',
    from: 'webp',
    to: 'png',
    accept: '.webp,image/webp',
    mimeType: 'image/png'
  },
  {
    label: 'SVG 转 PNG',
    value: 'svg-to-png',
    from: 'svg',
    to: 'png',
    accept: '.svg,image/svg+xml',
    mimeType: 'image/png'
  },
  {
    label: 'SVG 转 JPG',
    value: 'svg-to-jpg',
    from: 'svg',
    to: 'jpg',
    accept: '.svg,image/svg+xml',
    mimeType: 'image/jpeg'
  },
  {
    label: 'SVG 转 WebP',
    value: 'svg-to-webp',
    from: 'svg',
    to: 'webp',
    accept: '.svg,image/svg+xml',
    mimeType: 'image/webp'
  },
  {
    label: 'PNG 转 SVG',
    value: 'png-to-svg',
    from: 'png',
    to: 'svg',
    accept: '.png,image/png',
    mimeType: 'image/svg+xml'
  },
  {
    label: 'JPG 转 SVG',
    value: 'jpg-to-svg',
    from: 'jpg',
    to: 'svg',
    accept: '.jpg,.jpeg,image/jpeg',
    mimeType: 'image/svg+xml'
  },
  {
    label: 'WebP 转 SVG',
    value: 'webp-to-svg',
    from: 'webp',
    to: 'svg',
    accept: '.webp,image/webp',
    mimeType: 'image/svg+xml'
  }
];

/**
 * 获取文件扩展名
 */
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

/**
 * 验证文件格式
 */
export const validateFileFormat = (
  file: File,
  expectedFormat: ImageFormat
): boolean => {
  const fileType = file.type.toLowerCase();
  const extension = getFileExtension(file.name);

  if (expectedFormat === 'jpg') {
    return (
      fileType.includes('image/jpeg') ||
      fileType.includes('image/jpg') ||
      extension === 'jpg' ||
      extension === 'jpeg'
    );
  } else if (expectedFormat === 'png') {
    return fileType.includes('image/png') || extension === 'png';
  } else if (expectedFormat === 'webp') {
    return fileType.includes('image/webp') || extension === 'webp';
  } else if (expectedFormat === 'svg') {
    return (
      fileType.includes('image/svg+xml') ||
      fileType.includes('image/svg') ||
      extension === 'svg'
    );
  }
  return false;
};

/**
 * 将位图转换为 SVG（通过嵌入 base64）
 */
export const convertToSvg = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const base64 = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          // 使用 href 和 xlink:href 以确保兼容性
          const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${img.width}" height="${img.height}" viewBox="0 0 ${img.width} ${img.height}">
  <image width="${img.width}" height="${img.height}" href="${base64}" xlink:href="${base64}"/>
</svg>`;
          const blob = new Blob([svgContent], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          resolve(url);
        };
        img.onerror = () => {
          reject(new Error('图片加载失败'));
        };
        img.src = base64;
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };
    reader.readAsDataURL(file);
  });
};

/**
 * 获取转换质量参数
 * @param targetFormat 目标格式
 * @returns 质量值 (0-1)
 */
export const getConversionQuality = (targetFormat: ImageFormat): number => {
  // JPG 使用 0.9 质量，其他格式使用 1.0
  return targetFormat === 'jpg' ? 0.9 : 1.0;
};

/**
 * 通用图片格式转换函数
 * @param file 源文件
 * @param targetMimeType 目标 MIME 类型
 * @param quality 图片质量 (0-1)，仅对 JPG 和 WebP 有效
 * @returns Promise<string> 转换后的图片 URL
 */
export const convertImage = (
  file: File,
  targetMimeType: string,
  quality: number = 1.0
): Promise<string> => {
  // 如果目标格式是 SVG，使用特殊处理
  if (targetMimeType === 'image/svg+xml') {
    return convertToSvg(file);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('无法创建 Canvas 上下文'));
          return;
        }

        // 如果目标格式是 JPG，需要填充白色背景（因为 JPG 不支持透明）
        if (targetMimeType === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve(url);
            } else {
              reject(new Error('转换失败'));
            }
          },
          targetMimeType,
          quality
        );
      } catch (error) {
        reject(error);
      }
    };
    img.onerror = () => {
      reject(new Error('图片加载失败'));
    };
    img.src = URL.createObjectURL(file);
  });
};
