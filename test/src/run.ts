import { $ } from "bun";
import fs from "fs";
import path from "path";
import { getRepoRoot } from "common";

export async function runAll() {
  const root = await getRepoRoot();
  const benchmarksDir = path.join(root, "benchmarks");
  const benchmarks = fs.readdirSync(benchmarksDir);
  for (const benchmark of benchmarks) {
    for (const lang of fs.readdirSync(path.join(benchmarksDir, benchmark))) {
      const dirPath = path.join(benchmarksDir, benchmark, lang);
      // skip if not dir or no package.json
      if (!fs.existsSync(path.join(dirPath, "package.json"))) {
        continue;
      }
      await $`bun run clean`.cwd(dirPath);
      await $`bun run benchmark`.cwd(dirPath);
    }
  }
}
