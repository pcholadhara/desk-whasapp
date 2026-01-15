import { fsCollection, fsdb, toList } from "./fire"

export const getLead = async () => {
    const db = fsdb();
    const snap = await db.collection(fsCollection.LEAD_MASTER).orderBy("lastFollowup", "asc").limit(1).get();
    const list = toList(snap);
    if (list.length > 0) {
        return list[0];
    }

    console.log(list);
    return null;
}

export const getActivities = async (contactId) => {
    const db = fsdb();
    const snap = await db.collection(fsCollection.ACTIVITY)
                 .where("contactId", "==", contactId)
                 .orderBy("longDate", "desc")
                 .limit(20).get()
    const list = toList(snap);
    return list;
}