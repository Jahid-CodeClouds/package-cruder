## Hello guys I have created this package for ease of use with crud functionality with MongoDB and MySQL.

# Installation

#### Run command in your related project directory: npm i mongo-sql-cruder

# Configuration - MongoDB

#### Step 1: Take your MongoURI with database name appended

#### Step 2: Connect to your MongoDB

```Javascript
const Connect = require("mongo-sql-cruder");

const connect = new Connect("your-mongodb-connection-url");
```

# Usage

```Javascript

const list = async () => {
    const response = await connect.mongoCRUD("list", "collection-name");
}

const find = async () => {
    const response = await connect.mongoCRUD("find", "collection-name", {key: "value"});
}

const create = async () => {
    const response = await connect.mongoCRUD("createOne", "collection-name", {}, {key: "value"});
}

const createMany = async () => {
    const response = await connect.mongoCRUD("createMany", "collection-name", {}, [{key: "value-1"},{key: "value-2"}]);
}

const update = async () => {
    const response = await connect.mongoCRUD("updateOne", "collection-name", {key: "value"}, {key: "value"});
}

const updateMany = async () => {
    const response = await connect.mongoCRUD("updateMany", "collection-name", {key: "value"}, {key: "value"});
}

const deleteOne = async () => {
    const response = await connect.mongoCRUD("removeOne", "collection-name", {key: "value"});
}

const deleteMany = async () => {
    const response = await connect.mongoCRUD("removeMany", "collection-name", {key: "value"});
}


```

# Configuration - MySQL

#### Step 1: Take your SQL configurations

#### Step 2: Connect to your MySQL

```Javascript
const Connect = require("mongo-sql-cruder");

const connect = new Connect({
  host: "your-host",
  user: "your-username",
  password: "your-password",
  database: "your-database",
});
```

# Usage

```Javascript

const list = async () => {
  const response = await connect.mySqlCrud('list', 'table-name', {}, {})
}

const find = async () => {
  const response = await connect.mySqlCrud('find', 'table-name', {column: "value", id:2});
}

const create = async () => {
  const response = await connect.mySqlCrud('create', 'table-name', {}, {column: "value", column: "value"});
}

const update = async () => {
  const response = await connect.mySqlCrud('update', 'table-name', {column: "value"}, {column: "value", column: "value"});
}

const remove = async () => {
  const response = await connect.mySqlCrud('delete', 'table-name', {column: "value"});
}


```

# Conclusion

#### Thats it!! Its pretty simple and easy to use. Enjoy!
