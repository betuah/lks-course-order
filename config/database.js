const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const config = require("./aws");

const client = new DynamoDBClient(config.credential);
const ddbClient = DynamoDBDocumentClient.from(client);

module.exports = { ddbClient };
