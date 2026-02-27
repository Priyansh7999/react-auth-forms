/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_SERVER_URL: string;
  readonly VITE_APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}