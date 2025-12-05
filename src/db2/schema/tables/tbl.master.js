
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
    tmplBody    : "TEXT",
    dateTime    : "INTEGER"
}

