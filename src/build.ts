import AdmZip from "adm-zip";

import { join } from "path";
import { readdir, ensureDir, writeJSON } from "fs-extra";
import { spawn } from "child_process";

const SETTINGS = {
  apikey: "",
  authentication: {
    username: "",
    password: "",
  },
  rooms: [
    {
      name: "Test Room",
      beatmapId: 4686663,
      slots: 4,
    },
  ],
};

function cmd(...args: string[]) {
  return new Promise((resolve) => {
    const command = spawn(args[0], args.slice(1));
    command.on("close", () => {
      resolve(null);
    });
  });
}

async function main() {
  const targets = [
    "bun-linux-arm64",
    "bun-linux-x64",
    "bun-linux-x64-baseline",
    "bun-windows-x64",
    "bun-windows-x64-baseline",
    "bun-darwin-arm64",
    "bun-darwin-x64",
    "bun-darwin-x64-baseline",
  ];

  for (const target of targets) {
    const ourdir = join(__dirname, "..", "bin", target.slice(4));
    await ensureDir(ourdir);
    await cmd(
      "bun",
      "build",
      "./src/index.ts",
      "--compile",
      "--target",
      target,
      "--outfile",
      `./bin/${target.slice(4)}/start`
    );
    await writeJSON(join(ourdir, "settings.json"), SETTINGS, {
      spaces: 2,
    });
    const zip = new AdmZip();
    const files = await readdir(ourdir);
    for (const file of files) {
      const filePath = join(ourdir, file);
      zip.addLocalFile(filePath);
    }
    const filePath = join(
      __dirname,
      "..",
      "releases",
      `${target.slice(4)}.zip`
    );
    await new Promise((resolve, reject) => {
      zip.writeZip(filePath, (error) => {
        if (error) return reject(error);
        resolve(error);
      });
    });
  }
}

main();
