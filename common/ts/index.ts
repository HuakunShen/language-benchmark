import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

type Result = {
  input: number;
  time: number;
};

export function appendResults(results: Result[], path: string) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, "[]");
  }
  fs.writeFileSync(
    path,
    JSON.stringify([...JSON.parse(fs.readFileSync(path, "utf-8")), ...results])
  );
}

export function getRepoRoot() {
  return dirname(dirname(dirname(fileURLToPath(import.meta.url))));
}
