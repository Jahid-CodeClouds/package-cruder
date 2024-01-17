class CRUD {
  connection = null;
  constructor(connection) {
    this.connection = connection;
  }

  async list(resource, filters = {}) {
    return await this.connection.db
      .collection(resource)
      .find(filters)
      .toArray();
  }

  async find(resource, filters = {}) {
    return await this.connection.db.collection(resource).findOne(filters);
  }

  async createOne(resource, payload) {
    return await this.connection.db.collection(resource).insertOne(payload);
  }

  async createMany(resource, payload) {
      await this.connection.db.collection(resource).insertMany(payload);
  }

  async updateOne(resource, filters = {}, payload, options = {}) {
    return await this.connection.db.collection(resource).updateOne(
      filters,
      {
        $set: payload
      },
      options
    );
  }

  async updateMany(resource, filters = {}, payload, options = {}) {
    return await this.connection.db.collection(resource).updateMany(
      filters,
      {
        $set: payload
      },
      options
    );
  }

  async removeOne(resource, filters = {}) {
    return await this.connection.db.collection(resource).deleteOne(filters);
  }

  async removeMany(resource, filters = {}) {
    return await this.connection.db.collection(resource).deleteMany(filters);
  }
}

module.exports = CRUD;
