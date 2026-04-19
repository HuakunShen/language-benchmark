import { $ } from "bun";
import fs from "fs";
import path from "path";
import { getRepoRoot } from "common";

export async function runAllColdStart() {
  const root = await getRepoRoot();
  const benchmarksDir = path.join(root, "benchmarks");
  const benchmarks = fs.readdirSync(benchmarksDir);
  for (const benchmark of benchmarks) {
    for (const lang of fs.readdirSync(path.join(benchmarksDir, benchmark))) {
      const dirPath = path.join(benchmarksDir, benchmark, lang);
      const pkgPath = path.join(dirPath, "package.json");
      if (!fs.existsSync(pkgPath)) continue;
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      if (!pkg.scripts?.["cold-start"]) {
        console.log(`Skipping ${lang}: no cold-start script`);
        continue;
      }
      console.log(`Running cold-start for ${lang}...`);
      try {
        await $`bun run cold-start`.cwd(dirPath);
      } catch (e) {
        console.error(`Error running cold-start for ${lang}:`, (e as Error).message ?? e);
      }
    }
  }
}
