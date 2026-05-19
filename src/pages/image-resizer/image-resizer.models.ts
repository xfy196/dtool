import mime from 'mime';

const SUPPORTED_IMAGE_MIMES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/bmp'
]);

/** 上传 accept：MIME + 常见扩展名（jpeg 与 jpg 均保留） */
export const SUPPORTED_IMAGE_ACCEPT = [
  ...SUPPORTED_IMAGE_MIMES,
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.bmp'
].join(',');

function resolveFileMime(file: File): string | null {
  const fromBrowser = file.type?.toLowerCase();
  if (fromBrowser && SUPPORTED_IMAGE_MIMES.has(fromBrowser)) {
    return fromBrowser;
  }

  const fromExtension = mime.getType(file.name);
  if (fromExtension && SUPPORTED_IMAGE_MIMES.has(fromExtension)) {
    return fromExtension;
  }

  return null;
}

export function isSupportedImageFile(file: File): boolean {
  return resolveFileMime(file) !== null;
}

export function isBmpFile(file: File): boolean {
  return resolveFileMime(file) === 'image/bmp';
}

export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('LOAD_IMAGE_FAILED'));
    };
    img.src = url;
  });
}

export function getOutputMimeType(file: File): string {
  return resolveFileMime(file) ?? 'image/png';
}

export function getOutputExtension(file: File, mimeType: string): string {
  return (
    mime.getExtension(mimeType) ?? file.name.match(/\.([^.]+)$/i)?.[1] ?? 'png'
  );
}

/** 24-bit uncompressed BMP — Canvas toBlob 不支持 BMP，需手动编码 */
function canvasToBmpBlob(canvas: HTMLCanvasElement): Blob {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('CANVAS_CONTEXT_FAILED');
  }

  const { data } = ctx.getImageData(0, 0, w, h);
  const rowSize = Math.ceil((w * 3) / 4) * 4;
  const pixelDataSize = rowSize * h;
  const fileSize = 54 + pixelDataSize;
  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  view.setUint8(0, 0x42);
  view.setUint8(1, 0x4d);
  view.setUint32(2, fileSize, true);
  view.setUint32(6, 0, true);
  view.setUint32(10, 54, true);

  view.setUint32(14, 40, true);
  view.setInt32(18, w, true);
  view.setInt32(22, h, true);
  view.setUint16(26, 1, true);
  view.setUint16(28, 24, true);
  view.setUint32(30, 0, true);
  view.setUint32(34, pixelDataSize, true);

  let offset = 54;
  const rowPadding = rowSize - w * 3;

  for (let y = h - 1; y >= 0; y--) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      bytes[offset++] = data[i + 2]!;
      bytes[offset++] = data[i + 1]!;
      bytes[offset++] = data[i]!;
    }
    for (let p = 0; p < rowPadding; p++) {
      bytes[offset++] = 0;
    }
  }

  return new Blob([buffer], { type: 'image/bmp' });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('EXPORT_FAILED'));
        }
      },
      mimeType,
      quality
    );
  });
}

export async function resizeImageFile(
  file: File,
  width: number,
  height: number
): Promise<Blob> {
  const img = await loadImageFromFile(file);
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('CANVAS_CONTEXT_FAILED');
  }
  ctx.drawImage(img, 0, 0, w, h);

  if (isBmpFile(file)) {
    return canvasToBmpBlob(canvas);
  }

  const mimeType = getOutputMimeType(file);
  const quality = mimeType === 'image/jpeg' ? 0.92 : undefined;
  return canvasToBlob(canvas, mimeType, quality);
}

export function buildDownloadFileName(
  originalName: string,
  width: number,
  height: number,
  extension: string
): string {
  const base = originalName.replace(/\.[^.]+$/, '') || 'image';
  return `${base}-${width}x${height}.${extension}`;
}
