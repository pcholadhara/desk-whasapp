import { dbTables } from "../../utils/models/mdl.schema";
import { insertRow, updateRow } from "../schema/utils/db2.sqlite.run";

export const saveChat = async (chat) => {
    chat.dateTime = Date.now();
    const row = await insertRow(dbTables.WA_CHAT_LOG, chat);
    await updateNumbers(chat.msgTo, chat.msgBody);
    await updateNumbers(chat.msgFrom, chat.msgBody);
    return row;
}

const updateNumbers = async (number, msgBody) => {
    if(!number){
        return;
    }
    const data = {
        waNumber: number,
        waName : number,
        waMssg : msgBody,
        dateTime : Date.now()
    }
    const row = await updateRow(dbTables.WA_NUMBERS, data, {id: number});
    if(row.success === 0){
        data.id = number;
        await insertRow(dbTables.WA_NUMBERS, data);
    }
}