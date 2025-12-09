import { dbTables } from "../../utils/models/mdl.schema"
import { insertRow } from "../schema/utils/db2.sqlite.run"

export const saveToCampaign = async(camp)=>{
    const row = await insertRow(dbTables.WA_CAMPAIGN, camp);
    return row;
}