const mongoose = require("mongoose");
const CRUD = require("./crud");

class Connect {
  config = null;
  constructor(config) {
    this.config = config;
  }

  mongoCRUD = async (type, resource, filters = {}) => {
    let mongooseConnection = await mongoose
      .connect(this.config)
      .catch((err) => console.log("Connection error: " + err));

    const cruder = new CRUD(mongooseConnection.connection);
    let response = null;
    switch (type) {
      case "list":
        response = await cruder.list(resource, filters);
        break;
      default:
        response = "Invalid Payload";
    }

    return response;
  };
}

module.exports = Connect;
