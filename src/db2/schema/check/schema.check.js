import {checkTables} from "./schema.check.tbls";

const dbVersion = () => {
       const dbversion = 20250101;
       const localVersion = localStorage.getItem("bellyfill.dbversion");
       if(localVersion) {
              const version = parseInt(localVersion);
              if(dbversion > version) {
                     localStorage.setItem("bellyfill.dbversion", dbversion);
                     return true;
              }else{
                     return false;
              }
       }

       localStorage.setItem("bellyfill.dbversion", dbversion);
       return true;
}

export const setDatabase = async () => {
       const resp1 = await window.api.dbRequest({type: "db", name: `TjSyKaO0DRaNm4.db`});
}

export const checkSchema = async () =>{
       const version = dbVersion();
       if(!version) {
              return;
       }
       //await dropAllViews(dbViews);
       await checkTables();
       //await checkViews();
       //await checkAllConfig();
}
