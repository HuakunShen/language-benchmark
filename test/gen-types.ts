import { $ } from "bun";
import fs from "fs";
import {
  POCKETBASE_URL,
  POCKETBASE_USERNAME,
  POCKETBASE_PASSWORD,
} from "./src/constants";

await $`npx pocketbase-typegen --url ${POCKETBASE_URL} --email ${POCKETBASE_USERNAME} --password ${POCKETBASE_PASSWORD}`;
// move pocketbase-types.ts to src/pocketbase-types.ts
fs.renameSync("pocketbase-types.ts", "src/pocketbase-types.ts");
