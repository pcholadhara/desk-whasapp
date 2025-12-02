import QueryBuilder from "./db2.query.build";

export const runQuery = async (query) =>{
    const resp = await window.api.dbRequest({type: "run", query: query, params: []});
    return resp;
}

export const insertRow = async (tblName, data) =>{
    const buildr    = new QueryBuilder(tblName).getIQuery(data);
    const resp      = await window.api.dbRequest({type: "run", query: buildr.query, params: buildr.params});
    return resp;
}

export const updateRow = async (tblName, data, filter) =>{
    const buildr    = new QueryBuilder(tblName).getUQuery(data, filter);
    const resp      = await window.api.dbRequest({type: "run", query: buildr.query, params: buildr.params});
    return resp;
}