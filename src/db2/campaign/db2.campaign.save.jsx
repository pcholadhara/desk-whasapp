import { dbTables } from "../../utils/models/mdl.schema"
import { insertRow, updateRow } from "../schema/utils/db2.sqlite.run"

export const saveToCampaign = async(camp)=>{
    const row = await insertRow(dbTables.WA_CAMPAIGN, camp);
    return row;
}

export const upadateToCampaign = async(campId, camp)=>{
    const row = await updateRow(dbTables.WA_CAMPAIGN, camp, { id: campId });
    return row;
}