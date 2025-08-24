# Vite Plugin SOPS Env

🔐 A Vite plugin that loads and decrypts `.env.enc` using [SOPS](https://github.com/getsops/sops), and merges the variables with your existing `.env` — **without writing decrypted files to disk**.

## Features

- Decrypts `.env` on the fly
- Merges with `.env` or `.env.local`
- Injects `VITE_*` variables into `import.meta.env`
- Secure (no decrypted file written)

## Requirements

[SOPS](https://github.com/getsops/sops) must be installed first. You also need to create your encrypted `.env` file with the encryption method of your choice. `SOPS` supports many features please refer to their official documentation.

## Installation

```bash
npm install vite-plugin-sops-env --save-dev
```

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sopsEnvPlugin from "vite-plugin-sops-env";

export default defineConfig({
  plugins: [
    react(),
    sopsEnvPlugin({
      path: ".env", // optional, defaults to .env
    }),
  ],
});
```
