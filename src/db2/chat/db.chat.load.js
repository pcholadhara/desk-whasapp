import { dbTables } from "../../utils/models/mdl.schema";
import DbLoader from "../schema/utils/db2.sqlite.load"

export const getAllChats = async () => {
    const rows = await new DbLoader().from(dbTables.WA_CHAT_LOG).orderBy("dateTime asc").getRows();
    return rows;
}