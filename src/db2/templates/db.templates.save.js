import { dbTables } from "../../utils/models/mdl.schema";
import { insertRow } from "../schema/utils/db2.sqlite.run";

export const saveTemplate = async (template) => {
    template.dateTime = Date.now();
    const row = await insertRow(dbTables.WA_MSG_TMPLS, template);
    return row;
}