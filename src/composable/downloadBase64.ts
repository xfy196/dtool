import { extension } from 'mime-types';

const getBase64MimeType = (base64: string) => {
  const [, mimeType = undefined] = base64.match(/data:(.*?);base64/i) ?? [];
  return mimeType;
};
const getExtensionFromMimeType = (
  mimeType: string | undefined,
  defaultExtension = 'txt'
) => {
  if (mimeType) {
    return extension(mimeType) ?? defaultExtension;
  }
  return defaultExtension;
};
const downloadBase64File = ({
  sourceValue,
  fileName,
  extension,
  fileMimeType
}: {
  sourceValue: string;
  fileName?: string;
  extension?: string;
  fileMimeType?: string;
}) => {
  console.log('🚀 ~ fileMimeType:', fileMimeType);
  console.log('🚀 ~ extension:', extension);
  if (!sourceValue) {
    throw new Error('base64 is empty');
  }
  let base64String = '';
  const a = document.createElement('a');
  a.href = base64String;
  a.download = fileName || '';
  a.click();
};
export { getBase64MimeType, getExtensionFromMimeType, downloadBase64File };
