import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./pocketbase-types";
import {
  POCKETBASE_PASSWORD,
  POCKETBASE_URL,
  POCKETBASE_USERNAME,
} from "./constants";

export async function getSuperuserClient(options?: {
  url?: string;
  email?: string;
  password?: string;
}): Promise<PocketBase> {
  const client = new PocketBase(options?.url ?? POCKETBASE_URL);
  client.autoCancellation(false);
  await client
    .collection("_superusers")
    .authWithPassword(
      options?.email ?? POCKETBASE_USERNAME,
      options?.password ?? POCKETBASE_PASSWORD,
      {
        // This will trigger auto refresh or auto reauthentication in case
        // the token has expired or is going to expire in the next 30 minutes.
        autoRefreshThreshold: 30 * 60,
      }
    );
  return client;
}

export class DB {
  client: TypedPocketBase;

  constructor(client: TypedPocketBase) {
    this.client = client;
  }
}
