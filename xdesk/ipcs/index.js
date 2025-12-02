import {httpRequest} from "./http.req.js";
import {dbRequest} from "./sqlite.db.js";
import {whatsApp, setWhatsAppWindow } from "./wapp.client.js";

export const registerIpc = (ipc) =>{
    httpRequest(ipc);
    dbRequest(ipc);
    whatsApp(ipc);
}

export const setIpcWindow = (win) => {
    setWhatsAppWindow(win);
}
