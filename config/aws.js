module.exports = {
   dynamodb_table: process.env.AWS_DYNAMODB_TABLE,
   credential: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
   },
};
