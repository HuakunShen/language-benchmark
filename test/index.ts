import { DB, getSuperuserClient } from "./src/pocketbase";

const pb = await getSuperuserClient();
const db = new DB(pb);
const languages = await db.client.collection("languages").getFullList();
console.log(languages);
