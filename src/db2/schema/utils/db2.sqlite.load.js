class DbLoader{
    constructor() {
        this.columns        = "*"; // Default to all columns
        this.tblName        = "";
        this.joins          = [];
        this.whereClause    = "";
        this.whereParams    = [];
        this.groupByColumns = [];
        this.orderByClauses = [];
        this.limitCount     = null;
        this.offsetCount    = null;
    }

    select(columns) {
        if (!columns || (Array.isArray(columns) && columns.length === 0)) {
            throw new Error('Columns must be a non-empty string or array');
        }
        this.columns = Array.isArray(columns) ? columns.join(', ') : columns;
        return this;
    }

    from(tblName) {
        if (typeof tblName !== 'string' || !tblName.trim()) {
            throw new Error('Table name must be a non-empty string');
        }
        this.tblName = tblName;
        return this;
    }

    innerJoin(table, condition) {
        if (typeof table !== 'string' || !table.trim()) {
            throw new Error('Join table must be a non-empty string');
        }
        if (typeof condition !== 'string' || !condition.trim()) {
            throw new Error('Join condition must be a non-empty string');
        }
        this.joins.push({ type: 'INNER JOIN', table, condition });
        return this;
    }

    leftJoin(table, condition) {
        if (typeof table !== 'string' || !table.trim()) {
            throw new Error('Join table must be a non-empty string');
        }
        if (typeof condition !== 'string' || !condition.trim()) {
            throw new Error('Join condition must be a non-empty string');
        }
        this.joins.push({ type: 'LEFT JOIN', table, condition });
        return this;
    }

    rightJoin(table, condition) {
        if (typeof table !== 'string' || !table.trim()) {
            throw new Error('Join table must be a non-empty string');
        }
        if (typeof condition !== 'string' || !condition.trim()) {
            throw new Error('Join condition must be a non-empty string');
        }
        this.joins.push({ type: 'RIGHT JOIN', table, condition });
        return this;
    }

    where(clause, params = []) {
        if (typeof clause !== 'string' || !clause.trim()) {
            throw new Error('Where clause must be a non-empty string');
        }
        if (!Array.isArray(params)) {
            throw new Error('Params must be an array');
        }
        this.whereClause = clause;
        this.whereParams = params;
        return this;
    }

    groupBy(columns) {
        if (!columns || (Array.isArray(columns) && columns.length === 0)) {
            throw new Error('Group By columns must be a non-empty string or array');
        }
        this.groupByColumns = Array.isArray(columns) ? columns : [columns];
        return this;
    }

    orderBy(clauses) {
        if (!clauses || (typeof clauses !== 'string' && (!Array.isArray(clauses) || clauses.length === 0))) {
            throw new Error('Order By clauses must be a non-empty string or array');
        }
        this.orderByClauses = Array.isArray(clauses) ? clauses : [clauses];
        return this;
    }

    limit(count) {
        if (!Number.isInteger(count) || count < 0) {
            throw new Error('Limit must be a non-negative integer');
        }
        this.limitCount = count;
        return this;
    }

    offset(count) {
        if (!Number.isInteger(count) || count < 0) {
            throw new Error('Offset must be a non-negative integer');
        }
        this.offsetCount = count;
        return this;
    }

    buildQuery() {
        if (!this.tblName) {
            throw new Error('Table name is required');
        }

        let query = `SELECT ${this.columns} FROM ${this.tblName}`;
        const params = [];

        if (this.joins.length > 0) {
            query += ' ' + this.joins.map(j => `${j.type} ${j.table} ON ${j.condition}`).join(' ');
        }

        if (this.whereClause) {
            query += ` WHERE ${this.whereClause}`;
            params.push(...this.whereParams);
        }

        if (this.groupByColumns.length > 0) {
            query += ` GROUP BY ${this.groupByColumns.join(', ')}`;
        }

        if (this.orderByClauses.length > 0) {
            query += ` ORDER BY ${this.orderByClauses.join(', ')}`;
        }

        if (this.limitCount !== null) {
            query += ` LIMIT ${this.limitCount}`;
        }

        if (this.offsetCount !== null) {
            if (this.limitCount === null) {
                throw new Error('OFFSET requires LIMIT to be set');
            }
            query += ` OFFSET ${this.offsetCount}`;
        }

        return {query, params};
    }

    async get(id){
        if (!this.tblName) {
            throw new Error('Table name is required');
        }

        const query = `SELECT * FROM ${this.tblName} WHERE id = ? `;
        const params = [id];
        return await window.api.dbRequest({type: "get", query: query, params: params});
    }

    async getRow(){
        const {query, params} = this.buildQuery(); console.log({query, params});
        const response = await window.api.dbRequest({type: "get", query: query, params: params});
        return response;
    }

    async getRows() {
        const {query, params} = this.buildQuery();
        const response = await window.api.dbRequest({type: "all", query: query, params: params});
        return response;
    }
}


export default DbLoader;