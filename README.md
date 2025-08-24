# Vite Plugin SOPS Env

🔐 A Vite plugin that loads and decrypts `.env.enc` using [SOPS](https://github.com/getsops/sops), and merges the variables with your existing `.env` — **without writing decrypted files to disk**.

## Features

- Decrypts `.env.enc` on the fly
- Merges with `.env` or `.env.local`
- Injects `VITE_*` variables into `import.meta.env`
- Secure (no decrypted file written)

## Installation

```bash
npm install vite-plugin-sops-env --save-dev
