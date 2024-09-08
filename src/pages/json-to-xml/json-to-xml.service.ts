import xmlFormat from 'xml-formatter';

function isValidXml(xml: string) {
  const cleanXml = xml.trim();
  if (cleanXml === '') {
    return true;
  }
  try {
    xmlFormat(cleanXml);
    return true;
  } catch (error) {
    return false;
  }
}
export { isValidXml };
