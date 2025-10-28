interface ViteTypeOptions {
  // disallow unknown keys.
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
