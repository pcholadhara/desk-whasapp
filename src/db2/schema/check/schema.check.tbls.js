import {createTable} from "../utils/db2.tables";
import {dbTables} from "../../../utils/models/mdl.schema";
import { msgTmpls, tblChatting, tblNumbers } from "../tables/tbl.master";

export const checkTables = async () =>{
       await createTable(dbTables.WA_CHAT_LOG, tblChatting);
       await createTable(dbTables.WA_NUMBERS,  tblNumbers);
       await createTable(dbTables.WA_MSG_TMPLS,  msgTmpls);
}