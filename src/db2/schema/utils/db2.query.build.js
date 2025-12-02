class QueryBuilder {
      constructor(tblName) {
          this.tableName = tblName;
      }

      getIQuery(data){
          if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
              throw new Error('Invalid data for INSERT query');
          }

          const columns = Object.keys(data);
          const query = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;
          const params = columns.map(col => data[col]);

          return { query, params };
      }

      getUQuery(data, filter){
          if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
              throw new Error('Invalid data for UPDATE query');
          }
          if (!filter || typeof filter !== 'object' || Object.keys(filter).length === 0) {
              throw new Error('Invalid filter for UPDATE query');
          }

          const setClause   = Object.keys(data).map(col => `${col} = ?`).join(', ');
          const whereClause = Object.keys(filter).map(col => `${col} = ?`).join(' AND ');
          const query       = `UPDATE ${this.tableName} SET ${setClause} WHERE ${whereClause}`;

          const params = [
              ...Object.values(data),   // Values for SET
              ...Object.values(filter), // Values for WHERE
          ];

          return { query, params };
      }
}

export default QueryBuilder;