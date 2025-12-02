import {runQuery} from "./db2.sqlite.run";

export const createTable = async (tblName, columns) =>{
      if (!tblName || !columns || typeof columns !== 'object') {
            throw new Error('Invalid table name or columns');
      }

      const columnDefs = Object.entries(columns)
          .map(([name, type]) => `${name} ${type}`)
          .join(', ');


      const query = `CREATE TABLE IF NOT EXISTS ${tblName} (${columnDefs})`;
      console.log(query);
      const resp = await runQuery(query); await checkColumns(tblName, columns);

      return query;
}

const checkColumns = async (tblName, columns) =>{
      if (!tblName || !columns || typeof columns !== 'object') {
            throw new Error('Invalid table name or columns');
      }

      const query = `PRAGMA table_info(${tblName})`;
      const resp  = await window.api.dbRequest({type: "all", query: query, params: []});

      const keys  = Object.keys(columns);
      for(let i = 0; i < keys.length; i++){
            let idx = resp.findIndex(row => row.name === keys[i]);
            if(idx < 0){
                  const alter = `alter table ${tblName} add column ${keys[i]} ${columns[keys[i]]} `;
                  const resp1 = await window.api.dbRequest({type: "run", query: alter, params: []});
            }
      }
}

export const dropAllViews = async (viewlist) =>{
      const views = Object.keys(viewlist);
      for(let i = 0; i < views.length; i++){
            await dropView(views[i]);
      }
}

export const dropView = async (viwName) =>{
      try {
            const query = "DROP VIEW " + viwName;
            const resp = await window.api.dbRequest({type: "run", query: query, params: []});
            console.log(resp);
      }catch (error){
            console.log(error)
      }
}



