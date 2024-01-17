const mongoose = require("mongoose");
const CRUD = require("./crud");

class Connect {
  config = null;
  constructor(config) {
    this.config = config;
  }

  mongoCRUD = async (
    type,
    resource,
    filters = {},
    payload = {},
    options = {}
  ) => {
    let mongooseConnection = await mongoose
      .connect(this.config)
      .catch((err) => console.log("Connection error: " + err));

    const cruder = new CRUD(mongooseConnection.connection);
    
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
