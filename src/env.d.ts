/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly TRANSISTOR_API_KEY: string;
  readonly TRANSISTOR_SHOW_ID: string;
  readonly PUBLIC_OUTSETA_EMAIL_LIST_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
