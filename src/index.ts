import { join } from "path";
import { AhrClient, type AhrClientConfig, type AhrRoomConfig } from "osu-ahr";
import messages from "simple-log-messages";

messages.info(
  "Hi! We are starting to configure everything, please be patient..."
);

const SETTINGS_PATH = join(process.cwd(), "settings.json");

process.stdin.resume();

interface Config {
  prefix: string;
  config: AhrClientConfig;
  rooms: AhrRoomConfig[];
}

async function getConfig(): Promise<Config> {
  const data = await Bun.file(SETTINGS_PATH).json();

  const { rooms, prefix = "!", ...config } = data;

  if (!Array.isArray(rooms)) throw new Error("Invalid rooms object.");

  for (const room of rooms) {
    if (typeof room !== "object") throw new Error("Invalid room object.");
    if (!("name" in room)) throw new Error("Room name is required.");
    if (!("beatmapId" in room)) throw new Error("Beatmap ID is required.");
  }

  if (!("apikey" in config)) {
    throw new Error("API Key is required.");
  }

  if (!("authentication" in config)) {
    throw new Error("User data is required.");
  }

  if (!("username" in config.authentication)) {
    throw new Error("Username is required.");
  }

  if (!("password" in config.authentication)) {
    throw new Error("Password is required.");
  }

  return {
    prefix,
    config,
    rooms,
  };
}

async function main() {
  try {
    const { config, rooms, prefix } = await getConfig();
    const client = new AhrClient(config, rooms, prefix);
    await client.init();
    process.on("SIGINT", client.close);
    process.on("SIGTERM", client.close);
    process.on("beforeExit", client.close);
    process.on("exit", client.close);
  } catch (error) {
    if (error instanceof Error) {
      messages.error("An error occurred during execution.");
    }
    console.error(error);
  }
}

main();
