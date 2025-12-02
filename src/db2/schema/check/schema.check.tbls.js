import {createTable} from "../utils/db2.tables";
import {dbTables} from "../../../utils/models/mdl.schema";
import { tblChatting } from "../tables/tbl.master";

export const checkTables = async () =>{
       await createTable(dbTables.WA_CHAT_LOG, tblChatting);
}