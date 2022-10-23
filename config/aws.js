module.exports = {
   dynamodb_table:
      process.env.NODE_ENV === "production"
         ? process.env.AWS_DYNAMODB_TABLE_PROD
         : process.env.AWS_DYNAMODB_TABLE_TEST,
   credential: {
      credentials: {
         accessKeyId: process.env.AWS_ACCESS_KEY,
         secretAccessKey: process.env.AWS_SECRET_KEY,
      },
      region: process.env.AWS_REGION,
   },
};
