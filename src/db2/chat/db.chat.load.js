import { dbTables } from "../../utils/models/mdl.schema";
import { getSoftUser } from "../../xtra/localstore";
import DbLoader from "../schema/utils/db2.sqlite.load"

export const getAllChats = async () => {
    const rows = await new DbLoader().from(dbTables.WA_NUMBERS).orderBy("dateTime asc").getRows();
    return rows;
}

export const getChatsByNumber = async (phnNo) => {
    const row = await new DbLoader().from(dbTables.WA_CHAT_LOG)
                                    .where("msgFrom = ? OR msgTo = ?", [phnNo, phnNo])
                                    .orderBy("dateTime asc")
                                    .getRows();
    return row;
}

export const getNumberDetails = async (phnNo)=>{
    const row = await new DbLoader().from(dbTables.WA_NUMBERS)
                                    .where("id = ?", [phnNo])
                                    .getRow();
    return row;
}

