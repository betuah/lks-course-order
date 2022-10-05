const redis = require("redis");
const env = require("../env");
const fs = require("fs");
const ssl = {};

const redisClient = () => {
   const config = {
      port: env.redis.port,
      host: `${env.redis.host}`,
   };

   if (env.redis.password) config["password"] = env.redis.password;

   if (env.node_env === "production-https") {
      ssl = {
         tls: {
            key: fs.readFileSync(`${env.httpsPrivateKey}`, "utf8"),
            cert: fs.readFileSync(`${env.httpsCertificate}`, "utf8"),
         },
      };
   }

   return redis.createClient(
      env.node_env === "production-https" ? { ...config, ...ssl } : config
   );
};

module.exports = { redisClient };
