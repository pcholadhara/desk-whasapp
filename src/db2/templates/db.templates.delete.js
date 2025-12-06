import { dbTables } from "../../utils/models/mdl.schema"
import { deleteRow } from "../schema/utils/db2.sqlite.run"

export const deleteTemplates = async(id)=>{
    const res = await deleteRow(dbTables.WA_MSG_TMPLS, {id: id});
    return res;
}