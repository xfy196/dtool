import iconv from 'iconv-lite';

export type Gb2312ConvertMode = 'text-to-hex' | 'hex-to-text';

/** Strip separators and optional 0x; return contiguous hex digits. */
export function normalizeHexInput(raw: string): string {
  return raw.replace(/0x/gi, '').replace(/[,;\s]+/g, '');
}

export function hexStringToBytes(hex: string): Uint8Array {
  const clean = normalizeHexInput(hex);
  if (!clean.length) {
    return new Uint8Array(0);
  }
  if (clean.length % 2 !== 0) {
    throw new Error('INVALID_HEX_LEN');
  }
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    const pair = clean.slice(i * 2, i * 2 + 2);
    const n = Number.parseInt(pair, 16);
    if (Number.isNaN(n)) {
      throw new Error('INVALID_HEX_BYTE');
    }
    out[i] = n;
  }
  return out;
}

export function bytesToHexUpper(
  buf: ArrayLike<number>,
  separator = ' '
): string {
  const parts: string[] = [];
  for (let i = 0; i < buf.length; i++) {
    parts.push(buf[i]!.toString(16).toUpperCase().padStart(2, '0'));
  }
  return parts.join(separator);
}

export function textToGbkHex(text: string, separator = ' '): string {
  const encoded = iconv.encode(text, 'gbk');
  return bytesToHexUpper(encoded, separator);
}

export function gbkHexToText(hex: string): string {
  const bytes = hexStringToBytes(hex);
  if (!bytes.length) {
    return '';
  }
  return iconv.decode(bytes, 'gbk');
}
