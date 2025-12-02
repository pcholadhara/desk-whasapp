import Database from 'better-sqlite3';
let db = new Database('./bellyfill.db', { verbose: console.log });

export const dbRequest = (ipcMain) => {
    ipcMain.handle("db-request", (event, data)=>{
        console.log(data);
        try {
            switch (data.type) {
                case "db" :
                    db = new Database(data.name, {verbose: console.log});
                    return {success: 1};

                case "run":
                    const stmt = db.prepare(data.query);
                    const info = stmt.run(...(data.params || []));
                    return {success: info.changes, rowId: info.lastInsertRowid};

                case "all":
                    const allStmt = db.prepare(data.query);
                    return allStmt.all(...(data.params || []));

                case "get":
                    const getStmt = db.prepare(data.query);
                    return getStmt.get(...(data.params || [])) || null;

                default : return {success: "Error. No type found", rowId: ""};
            }
        }catch (error){
            return {
                error: {
                    message : error.message, // e.g., "SQLITE_ERROR: no such table: foo"
                    code    : error.code,    // e.g., "SQLITE_ERROR"
                    query   : data.query,    // Include the failing query for context
                    params  : data.params,   // Include params for debugging
                },
            };
        }
    });
}
