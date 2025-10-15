import * as path from "node:path";
import {
  writeFile,
  access,
  constants,
  mkdir,
  appendFile,
  unlink,
} from "node:fs/promises";

const LOG_DIR = path.join(__dirname, "..", "..", "logs"); //PATH/logs
const LOG_FILE = path.join(LOG_DIR, "log.txt");

export async function createFile(filePath = LOG_FILE) {
  try {
    await writeFile(filePath, "", { encoding: "utf-8" });
    console.log(`File successfully created: ${LOG_FILE}`);
  } catch (error) {
    console.error(error);
  }
}

export async function createDir(path = LOG_DIR) {
  try {
    await mkdir(path, { recursive: true });
    console.log(`Directory successfully created: ${path}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteFile(path: string): Promise<void> {
  try {
    if (await pathExists(path)) {
      await unlink(path);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function pathExists(path = LOG_FILE): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}