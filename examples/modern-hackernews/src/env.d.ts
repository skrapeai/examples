/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  readonly PUBLIC_SKRAPE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
