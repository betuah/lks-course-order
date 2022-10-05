const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
   process.env.DB_NAME,
   process.env.DB_USER,
   process.env.DB_PASSWORD,
   {
      host: process.env.DB_HOST,
      logging: false,
      dialect: process.env.DB_ENGGINE || "postgres",
      pool: {
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000,
      },
   }
);

sequelize
   .authenticate()
   .then(() => {
      console.info("Connection has been established successfully.");
      sequelize
         .sync({ alter: true })
         .then(() => {
            console.info("The table was sync");
         })
         .catch((e) => {
            console.log(e);
         });
      //       // await sequelize.sync({ force: true });
   })
   .catch((e) => {
      console.log("Unable to connect to the database : ", e);
   });

module.exports = sequelize;
