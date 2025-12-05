import mime from 'mime';

const useDownloadFile = ({
  source,
  fileName = 'file',
  extension = 'txt'
}: {
  source: string;
  fileName?: string;
  extension?: string;
}) => {
  try {
    const blob = new Blob([source], {
      type: mime.getType(extension || 'file') + ';charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.log('error is', e);
  }
};
export { useDownloadFile };
