import mime from 'mime';
import { Ref } from 'vue';

const getBase64MimeType = (base64: string): string => {
  const [, mimeType = ''] = base64.match(/data:(.*?);base64/i) ?? [];
  return mimeType;
};
const getExtensionFromMimeType = (
  mimeType: string | undefined,
  defaultExtension = 'txt'
): string => {
  if (mimeType) {
    const ext = mime.getExtension(mimeType);
    return ext === null ? defaultExtension : ext;
  }
  return defaultExtension;
};
const downloadBase64File = ({
  source,
  fileName,
  extension,
  fileMimeType
}: {
  source: string;
  fileName?: string;
  extension?: string;
  fileMimeType?: string;
}) => {
  if (!source) {
    throw new Error('base64 is empty');
  }
  let base64String = source;
  const mimeType = getBase64MimeType(source);
  if (!mimeType) {
    const targetMimeType = fileMimeType ?? mime.getType(extension ?? 'txt');
    base64String = `data:${targetMimeType};base64,${source}`;
  }
  const ext = extension || getExtensionFromMimeType(mimeType);
  let cleanFileName = fileName ?? `${fileName}.${ext}`;
  if (ext && !cleanFileName.endsWith(`.${ext}`)) {
    cleanFileName = `${cleanFileName}.${ext}`;
  }
  const a = document.createElement('a');
  a.href = base64String;
  a.download = cleanFileName || '';
  a.click();
};

const useDownloadBase64File = ({
  source,
  fileName,
  extension
}: {
  source: Ref<string>;
  fileName?: string;
  extension?: string;
}) => {
  return {
    download() {
      return downloadBase64File({
        source: source.value,
        fileName,
        extension
      });
    }
  };
};
const useDownloadBase64FileRef = ({
  source,
  fileName,
  extension
}: {
  source: Ref<string>;
  fileName?: Ref<string>;
  extension?: Ref<string>;
}) => {
  return {
    download() {
      return downloadBase64File({
        source: source.value,
        fileName: fileName?.value,
        extension: extension?.value
      });
    }
  };
};
const usePreviewImgFormBase64 = (base64String: string) => {
  if (!base64String) {
    throw new Error('base64 is empty');
  }
  const img = document.createElement('img');
  img.src = base64String;
  const container = document.createElement('div');
  container.appendChild(img);
  const previewContainer = document.getElementById('preview-container');
  if (previewContainer) {
    previewContainer.innerHTML = '';
    previewContainer.appendChild(container);
  } else {
    throw new Error('preview-container is not found');
  }
  return img;
};
export {
  getBase64MimeType,
  getExtensionFromMimeType,
  downloadBase64File,
  useDownloadBase64File,
  useDownloadBase64FileRef,
  usePreviewImgFormBase64
};
