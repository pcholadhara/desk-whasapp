import { getStrDate } from "../xtra/dates"
import { add2Fs, fsCollection, updateFs } from "./fire"

export const saveLeadActivity = async (lead, phoneNo, description) =>{
        const data = {
            activityType      : "Message",
            activityDesc      : "WHATSAPP MESSAGE",
            activityNote      : description,

            contactId         : lead.id,
            contactName       : lead.leadName,
            contactPhone      : phoneNo,
            ptype             : 201,
            pid               : lead.id,
            pName             : lead.leadName,

            activityOwnerName : "Pranjal Choladhara",
            createByName      : "Pranjal Choladhara",
            activityOwner     : "hnFjmW2xK9wWvQQ5weL4",
            reviewOn          : 0,
            
            status            : 1,
            reviewBy          : "",
            
            strDate  : getStrDate(Date.now()),
            longDate : Date.now(),
            createOn : Date.now(),
            createBy : "hnFjmW2xK9wWvQQ5weL4",
            modifyOn : 0,
            modifyBy : "",
            doneOn   : Date.now(),
            doneBy   : "hnFjmW2xK9wWvQQ5weL4",
            updateOn : Date.now(),

            viewers: [
                "hnFjmW2xK9wWvQQ5weL4", "hnFjmW2xK9wWvQQ5weL4"
            ],
    }

    const lastFollowup = {
        lastFollowup : Date.now(),
        updateOn     : Date.now()
    }

    const saved1 = await add2Fs(fsCollection.ACTIVITY, data);
    const saved2 = await updateFs(fsCollection.LEAD_MASTER, lead.id, lastFollowup);
    return saved1 && saved2;
}

export const skipFollowup = async (lead) =>{
    const lastFollowup = {
        lastFollowup : Date.now(),
        updateOn     : Date.now()
    }

    const saved2 = await updateFs(fsCollection.LEAD_MASTER, lead.id, lastFollowup);
    return saved2;
}