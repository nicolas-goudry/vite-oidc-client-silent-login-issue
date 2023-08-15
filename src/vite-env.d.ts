/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IDP_URL: string
  readonly VITE_IDP_CLIENT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
