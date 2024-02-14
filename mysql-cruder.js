class MySqlCruder {
  connection = null;
  constructor(connection) {
    this.connection = connection;
  }

  list(table, sortOptions) {
    let sort = this.getModifiedOptions("sort", sortOptions);
    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT * FROM ${table} ORDER BY ${sort}`,
        (error, results) => {
          if (results) {
            resolve(this.getResponse(results));
          }

          if (error) {
            reject(this.getError(error));
          }
        }
      );
    });
  }

  find(table, filterOptions, sortOptions) {
    let sort = this.getModifiedOptions("sort", sortOptions);
    let condition = this.getModifiedOptions("condition", filterOptions);

    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT * FROM ${table} WHERE ${condition} ORDER BY ${sort}`,
        (error, results) => {
          if (results) {
            resolve(this.getResponse(results));
          }
          if (error) {
            reject(this.getError(error));
          }
        }
      );
    });
  }

  create(table, payload) {
    let columns = Object.keys(payload).join(",");
    let values = Object.values(payload)
      .map((value) => `"${value}"`)
      .join(",");

    return new Promise((resolve, reject) => {
      this.connection.query(
        `INSERT INTO ${table}(${columns}) VALUES(${values})`,
        (error, results) => {
          if (results) {
            resolve(results);
          }
          if (error) {
            reject(error);
          }
        }
      );
    });
  }

  update(table, filterOptions, payload) {
    let conditions = this.getModifiedOptions("condition", filterOptions);
    let updatePayload = this.getModifiedOptions("payload", payload);

    return new Promise((resolve, reject) => {
      this.connection.query(
        `UPDATE ${table} SET ${updatePayload} WHERE ${conditions}`,
        (error, results) => {
          if (results) {
            resolve(results);
          }

          if (error) {
            reject(error);
          }
        }
      );
    });
  }

  delete(table, filterOptions) {
    let conditions = this.getModifiedOptions("condition", filterOptions);
    return new Promise((resolve, reject) => {
      this.connection.query(
        `DELETE FROM ${table} WHERE ${conditions}`,
        (error, results) => {
          if (results) {
            resolve(results);
          }

          if (error) {
            reject(error);
          }
        }
      );
    });
  }

  getModifiedOptions(type, options) {
    let arr = [];
    Object.keys(options).forEach((key) => {
      if (options[key]) {
        if (type === "sort") {
          arr.push(`${key} ${options[key]}`);
        } else {
          arr.push(`${key}="${options[key]}"`);
        }
      }
    });

    if (type === "condition") {
      return arr.join(" AND ");
    }
    return arr.join(",");
  }

  getResponse = (results) => {
    return JSON.parse(JSON.stringify(results));
  };

  getError = (error) => {
    return `Query error: ${error}`;
  };
}

module.exports = MySqlCruder;
