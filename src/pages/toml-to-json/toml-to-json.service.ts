import { parse } from 'iarna-toml-esm';

export function isValidToml(toml: string) {
  try {
    if (toml === '') {
      return false;
    }
    return parse(toml);
  } catch (error: any) {
    return false;
  }
}
