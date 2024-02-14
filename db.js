const mongoose = require("mongoose");
const mysql = require("mysql");
const MongoCruder = require("./mongo-cruder");
const MySqlCruder = require("./mysql-cruder");

class Connect {
  config = null;
  resultData = null;
  constructor(config) {
    this.config = config;
  }

  resultData = (result) => {
    return JSON.parse(JSON.stringify(result));
  };

  mySqlCrud = async (
    type,
    resource,
    filterOptions = {},
    payload = {},
    sortOptions = { id: "ASC" },
  ) => {
    let connection = await mysql.createConnection(this.config);
    connection.connect((err) => {
      if (err) throw err;
    });

    var response = null;
    switch (type) {
      case "list":
        response = await new MySqlCruder(connection).list(
          resource,
          sortOptions
        );
        break;
      case "find":
        response = await new MySqlCruder(connection).find(
          resource,
          filterOptions,
          sortOptions
        );
        break;
      case "create":
        response = new MySqlCruder(connection).create(resource, payload);
        break;
      case "update":
        response = new MySqlCruder(connection).update(
          resource,
          filterOptions,
          payload
        );
        break;
      case "delete":
        response = new MySqlCruder(connection).delete(resource, filterOptions);
        break;
      default:
        response = "Invalid type";
    }

    return response;
  };

  mongoCRUD = async (
    type,
    resource,
    filters = {},
    payload = {},
    options = {}
  ) => {
    let mongooseConnection = await mongoose
      .connect(this.config)
      .catch((err) => {
        throw "Connection error: " + err;
      });

    const cruder = new MongoCruder(mongooseConnection.connection);

    let response = null;
    switch (type) {
      case "list":
        response = await cruder.list(resource, filters);
        break;
      case "find":
        response = await cruder.find(resource, filters);
        break;
      case "createOne":
        response = await cruder.createOne(resource, payload);
        break;
      case "createMany":
        response = await cruder.createMany(resource, payload);
        break;
      case "updateOne":
        response = await cruder.updateOne(resource, filters, payload, options);
        break;
      case "updateMany":
        response = await cruder.updateMany(resource, filters, payload, options);
        break;
      case "removeOne":
        response = await cruder.removeOne(resource, filters);
        break;
      case "removeMany":
        response = await cruder.removeMany(resource, filters);
        break;
      default:
        response = "Invalid type";
    }

    return response;
  };
}

module.exports = Connect;
