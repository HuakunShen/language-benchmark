import { DB, getSuperuserClient } from "./src/pocketbase";
import { runAll } from "./src/run";

const pb = await getSuperuserClient();
const db = new DB(pb);
const languages = await db.client.collection("languages").getFullList();

runAll();
