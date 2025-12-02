import Dexie from "dexie"

export const pxdb = () =>{
    const dbs = new Dexie("peasx");
    dbs.version(20250210).stores({
        APP_LOG_HISTORY         : "&id, iid, cid, updateOn",
        CRM_SOFT_USER           : "&id, appName, companyId, contactId, validTill, lastActive, updateOn",
        CRM_COMPANY             : "&id, appName, validTill, lastActive, updateOn",
    });

    return dbs;
}

export const set2PxDb = async (tbl, data) =>{
    data.updateOn = 0;
    const db  = pxdb();
    const _id = await db.table(tbl).put(data);
    return _id;
}

export const del4mPxDb = async (tbl, id) =>{
    const db = pxdb();
    const _id = await db.table(tbl).delete(id);
    return _id;
}
