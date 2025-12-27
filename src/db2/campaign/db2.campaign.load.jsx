import { dbTables } from "../../utils/models/mdl.schema";
import DbLoader from "../schema/utils/db2.sqlite.load";

export const getCampaignNumber = async () => {
    const rows = await new DbLoader().from(dbTables.WA_CAMPAIGN)
                                    .where("isSent = ?", ["N"])
                                    .getRows();
    console.log("Campaign Numbers", rows);
    if (rows.length === 0) return null;
    return rows[0];
}