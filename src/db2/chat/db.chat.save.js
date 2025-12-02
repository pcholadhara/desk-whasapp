import { dbTables } from "../../utils/models/mdl.schema";
import { insertRow } from "../schema/utils/db2.sqlite.run";

export const saveChat = async (chat) => {
    chat.dateTime = Date.now();
    const row = await insertRow(dbTables.WA_CHAT_LOG, chat);
    return row;
}