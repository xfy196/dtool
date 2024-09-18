import { parse } from 'iarna-toml-esm';

export function isValidToml(toml: string) {
  try {
    return parse(toml);
  } catch (error: any) {
    return false;
  }
}
