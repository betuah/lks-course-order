require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const production = {
   node_env: process.env.NODE_ENV,
   token_secret: process.env.TOKEN_SECRET,
   system_secret: process.env.SYSTEM_SECRET,
   encryption_key: process.env.ENCRYPTION_KEY,
   log_path: process.env.LOG_PATH,
   cache_path: process.env.LOG_PATH,
   aws: {
      accessKey: process.env.AWS_ACCESS_KEY,
      secretKey: process.env.AWS_SECRET_KEY,
      bucketName: process.env.AWS_BUCKET_NAME,
      bucketRegion: process.env.AWS_BUCKET_REGION,
      cfUrl: process.env.AWS_CF_URL,
      cfPrivateKey: process.env.AWS_CF_PRIVATE_KEY,
      cfKeyPairId: process.env.AWS_CF_KEY_PAIR_ID,
   },
   sequelize: {
      dbName: process.env.DB_NAME,
      dbUser: process.env.DB_USER,
      dbPassword: process.env.DB_PASSWORD,
      dbHost: process.env.DB_HOST,
      dbPort: process.env.DB_PORT,
      dbEnggine: process.env.DB_ENGGINE,
   },
   mail: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
      tls: process.env.MAIL_TLS,
   },
};

const testing = {
   node_env: process.env.NODE_ENV,
   token_secret: process.env.TOKEN_SECRET,
   system_secret: process.env.SYSTEM_SECRET,
   encryption_key: process.env.ENCRYPTION_KEY,
   log_path: process.env.LOG_PATH,
   cache_path: process.env.LOG_PATH,
   aws: {
      accessKey: process.env.AWS_ACCESS_KEY,
      secretKey: process.env.AWS_SECRET_KEY,
      bucketName: process.env.AWS_BUCKET_NAME,
      bucketRegion: process.env.AWS_BUCKET_REGION,
      cfUrl: process.env.AWS_CF_URL,
      cfPrivateKey: process.env.AWS_CF_PRIVATE_KEY,
      cfKeyPairId: process.env.AWS_CF_KEY_PAIR_ID,
   },
   sequelize: {
      dbName: process.env.AWS_DB_NAME,
      dbUser: process.env.AWS_DB_USER,
      dbPassword: process.env.AWS_DB_PASSWORD,
      dbHost: process.env.AWS_DB_HOST,
      dbPort: process.env.AWS_DB_PORT,
      dbEnggine: process.env.AWS_DB_ENGGINE,
   },
   mail: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
      tls: process.env.MAIL_TLS,
   },
};

const dev = {
   node_env: process.env.NODE_ENV,
   token_secret: process.env.TOKEN_SECRET,
   system_secret: process.env.SYSTEM_SECRET,
   encryption_key: process.env.ENCRYPTION_KEY,
   db_type: process.env.DB_TYPE,
   log_path: process.env.LOG_PATH,
   cache_path: process.env.LOG_PATH,
   aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretKey: process.env.AWS_SECRET_KEY,
      bucketName: process.env.AWS_BUCKET_NAME,
      bucketRegion: process.env.AWS_BUCKET_REGION,
      cfUrl: process.env.AWS_CF_URL,
      cfPrivateKey: process.env.AWS_CF_PRIVATE_KEY,
      cfKeyPairId: process.env.AWS_CF_KEY_PAIR_ID,
   },
   sequelize: {
      dbName: process.env.DB_NAME,
      dbUser: process.env.DB_USERNAME,
      dbPassword: process.env.DB_PASSWORD,
      dbHost: process.env.DB_HOST,
      dbPort: process.env.DB_PORT,
      dbEnggine: process.env.DB_ENGGINE,
   },
   mail: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
      tls: process.env.MAIL_TLS,
   },
};

module.exports =
   process.env.NODE_ENV === "production"
      ? production
      : process.env.NODE_ENV === "testing"
      ? testing
      : dev;
