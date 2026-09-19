/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public URL of resume.json in the S3 content bucket (see `terraform output content_url`). */
  readonly VITE_CONTENT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
