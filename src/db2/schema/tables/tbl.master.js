import { MessageSquareDotIcon } from "lucide-react"

export const tblChatting = {
    id          : "INTEGER PRIMARY KEY AUTOINCREMENT",
    msgTo       : "TEXT",
    msgFrom     : "TEXT",
    msgBody     : "TEXT",
    senderName  : "TEXT",
    receipient  : "TEXT",
    msgType     : "TEXT",
    dateTime    : "INTEGER"
}

export const tblNumbers = {
    id          : "TEXT PRIMARY KEY",
    waNumber    : "TEXT",
    waName      : "TEXT",
    waMssg      : "TEXT",
    dateTime    : "INTEGER"
}

export const msgTmpls = {
    id          : "INTEGER PRIMARY KEY AUTOINCREMENT",
    tmplName    : "TEXT",
    tmplCategory: "TEXT",
    tmplBody    : "TEXT",
    dateTime    : "INTEGER"
}

export const tblCampaign = {
    id          : "INTEGER PRIMARY KEY AUTOINCREMENT",
    phnNo       : "TEXT",
    sentOn      : "INTEGER",
    tmplsId     : "INTEGER",
    isSent      : "TEXT DEFAULT 'N' "
}

