/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GIPHY_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
