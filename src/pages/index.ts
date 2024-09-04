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
import { ToolCategory } from './tool.types.ts';
import { ConvertRange20Regular } from '@vicons/fluent';
import { Lock } from '@vicons/tabler';
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
      tokenGenerator
    ]
  },
  {
    name: 'Converter',
    show: true,
    icon: ConvertRange20Regular,
    components: [
      romanNumeralConverter,
      colorConverter,
      dateConverter,
      strSplit,
      integerConverter,
      base64StringConverter
    ]
  }
];
export const tools = toolsCategory.flatMap(({ components }) => components);
export const toolsWithCategory = toolsCategory.flatMap(({ components, name }) =>
  components.map((tool) => ({ category: name, ...tool }))
);
