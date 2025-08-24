import { Plugin, loadEnv } from "vite";
import { execSync } from "child_process";
import fs from "fs";
import { parse } from "./utils.js";

export interface SopsEnvPluginOptions {
  path?: string;
}

export default function sopsEnvPlugin(options?: SopsEnvPluginOptions): Plugin {
  const envPath = options?.path || ".env";

  return {
    name: "vite-plugin-sops-env",
    config(config, { mode }) {
      loadEnv(mode, process.cwd(), "");

      if (!fs.existsSync(envPath)) {
        console.warn(
          `❌ [sops-env] Encrypted env file not found at ${envPath}`
        );
        return;
      }

      let decrypted = "";
      try {
        decrypted = execSync(`sops -d ${envPath}`, { encoding: "utf-8" });
      } catch (err) {
        console.error(`❌ [sops-env] Failed to decrypt ${envPath}:`, err);
        process.exit(1);
      }

      const parsed = parse(decrypted);

      for (const [key, value] of Object.entries(parsed)) {
        process.env[key] = value;
      }

      const defineEntries = Object.fromEntries(
        Object.entries(parsed)
          .filter(([key]) => key.startsWith("VITE_"))
          .map(([key, value]) => [
            `import.meta.env.${key}`,
            JSON.stringify(value),
          ])
      );

      return {
        define: {
          ...defineEntries,
          ...config.define,
        },
      };
    },
    // configureServer(server) {
    //   const envPathToWatch = envPath;

    //   server.watcher.add(envPathToWatch);

    //   server.watcher.on("change", (file) => {
    //     if (file === envPathToWatch) {
    //       console.log(
    //         `🏸 [sops-env] ${file} changed. Restarting Vite server...`
    //       );
    //       server.restart();
    //     }
    //   });
    // },
  };
}
