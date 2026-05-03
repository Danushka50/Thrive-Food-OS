declare module '*.ttf';
declare module '*.otf';
declare module '*.woff';
declare module '*.woff2';

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
