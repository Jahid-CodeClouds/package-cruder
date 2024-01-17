## Hello guys I have created this package for ease of use with crud functionality related to mongoDB.

# Installation

## Run command in your related project directory: npm i mongo-cruder

# Configuration

## Step 1: Take your MongoURI with database name appended

## Step 2: Connect to your MongoDB

```Javascript
const Connect = require("mongo-cruder");

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

# Conclusion

## Thats it!! Its pretty simple and easy to use. Enjoy

# Note

## There will also be some great updates on this package so stay tuned. Cheers!!