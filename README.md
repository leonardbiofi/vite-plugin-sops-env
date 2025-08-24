# Vite Plugin SOPS Env
A Vite plugin that loads and decrypts `.env` using SOPS

## Features

- Decrypts `.env.enc` on the fly
- Merges with `.env` or `.env.local`
- Injects `VITE_*` variables into `import.meta.env`
- Secure (no decrypted file written)

## Installation

```bash
npm install vite-plugin-sops-env --save-dev
```
