/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'iarna-toml-esm' {
  export function parse(toml: string): any;
  export function stringify(json: any): string;
}
declare module 'pdf-signature-reader' {
  export default any;
}
declare module 'markdown-it-mark' {
  export default any;
}
