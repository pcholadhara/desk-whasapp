import { dbTables } from "../../utils/models/mdl.schema";
import { insertRow, updateRow } from "../schema/utils/db2.sqlite.run";

export const saveTemplate = async (template) => {
    delete template.id;
    template.dateTime   = Date.now();
    const row           = await insertRow(dbTables.WA_MSG_TMPLS, template);
    return row;
}

export const updateTemplate = async(template, id) =>{
    template.dateTime   = Date.now();
    const row           = await updateRow(dbTables.WA_MSG_TMPLS, template, {id: id});
    return row;
}