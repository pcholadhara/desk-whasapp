import { dbTables } from "../../utils/models/mdl.schema";
import DbLoader from "../schema/utils/db2.sqlite.load"

export const getAllTemplates = async()=>{
    const rows = await new DbLoader().from(dbTables.WA_MSG_TMPLS).orderBy("dateTime asc").getRows();
    return rows;
}

export const getTmplsById = async(id)=>{
    const row = await new DbLoader().from(dbTables.WA_MSG_TMPLS)
                                    .where("id = ?", [id])
                                    .getRow();
    return row;
}