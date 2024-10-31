import { tool as uuidGenerator } from './uuid-generator';
import { tool as bcrypt } from './bcrypt';
import { tool as passwordStrengthAnalyser } from './password-strength-analyser';
import { tool as ulidGenerator } from './ulid-generator';
import { tool as tokenGenerator } from './token-generator';
import { tool as hashText } from './hash-text';
import { tool as dateConverter } from './date-time-converter';
import { tool as strSplit } from './str-split';
import { tool as integerConverter } from './integer-converter';
import { tool as base64StringConverter } from './base64-string-converter';
import { tool as romanNumeralConverter } from './roman-numeral-converter';
import { tool as colorConverter } from './color-converter';
import { tool as caseConverter } from './case-converter';
import { tool as base64FileConverter } from './base64-file-converter';
import { tool as mimeTypes } from './mime-types';
import { tool as deviceInformation } from './device-information';
import { tool as keycodeInfo } from './keycode-info';
import { tool as textToUnicode } from './text-to-unicode';
import { tool as xmlToJson } from './xml-to-json';
import { tool as jsonToXml } from './json-to-xml';
import { tool as yamlToJson } from './yaml-to-json';
import { tool as jsonToYaml } from './json-to-yaml';
import { tool as tomlToJson } from './toml-to-json';
import { tool as markdownToHtml } from './markdown-to-html';
import { tool as jsonToToml } from './json-to-toml';
import { tool as tomlToXml } from './toml-to-xml';
import { tool as yamlToToml } from './yaml-to-toml';
import { tool as encryption } from './encryption';
import { tool as bip39Generator } from './bip39-generator';
import { tool as hmacGenerator } from './hmac-generator';
import { tool as rsaKeyPairGenerator } from './rsa-key-pair-generator';
import { tool as snowflakeIdGenerator } from './snowflake-id-generator';
import { tool as pdfSignatureChecker } from './pdf-signature-checker';
import { tool as urlParser } from './url-parser';
import { tool as qrcodeGenerator } from './qrcode-generator';
import { tool as svgPlaceholderGenerator } from './svg-placeholder-generator';
import { tool as cameraRecorder } from './camera-recorder';
import { tool as placeholder } from './placeholder';
import { tool as htmlWysiwygEditor } from './html-wysiwyg-editor';
import { ToolCategory } from './tool.types.ts';
import { ConvertRange20Regular } from '@vicons/fluent';
import { ApplicationWeb } from '@vicons/carbon';
import { Lock, Photo } from '@vicons/tabler';
export const toolsCategory: ToolCategory[] = [
  {
    name: 'Crypto',
    icon: Lock,
    show: true,
    components: [
      bcrypt,
      passwordStrengthAnalyser,
      hashText,
      uuidGenerator,
      ulidGenerator,
      tokenGenerator,
      encryption,
      bip39Generator,
      hmacGenerator,
      rsaKeyPairGenerator,
      snowflakeIdGenerator,
      pdfSignatureChecker
    ]
  },
  {
    name: 'Converter',
    show: true,
    icon: ConvertRange20Regular,
    components: [
      caseConverter,
      romanNumeralConverter,
      colorConverter,
      dateConverter,
      strSplit,
      integerConverter,
      base64StringConverter,
      base64FileConverter,
      textToUnicode,
      jsonToYaml,
      jsonToToml,
      jsonToXml,
      xmlToJson,
      tomlToJson,
      yamlToJson,
      tomlToXml,
      yamlToToml,
      markdownToHtml
    ]
  },
  {
    name: 'Web',
    show: true,
    icon: ApplicationWeb,
    components: [
      keycodeInfo,
      mimeTypes,
      deviceInformation,
      urlParser,
      htmlWysiwygEditor
    ]
  },
  {
    name: 'PhotoAndVideo',
    show: true,
    icon: Photo,
    components: [
      qrcodeGenerator,
      svgPlaceholderGenerator,
      cameraRecorder,
      placeholder
    ]
  }
];
export const tools = toolsCategory.flatMap(({ components }) => components);
export const toolsWithCategory = toolsCategory.flatMap(({ components, name }) =>
  components.map((tool) => ({ category: name, ...tool }))
);
