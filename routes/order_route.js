const Order = require("../controllers/order");

module.exports = (app) => {
   app.route("/").get(Order.check);

   app.route("/api/v1/order").get(Order.get_all);

   app.route("/api/v1/order/:orderId").get(Order.get_by_id);

   app.route("/api/v1/order").post(Order.create);

   app.route("/api/v1/order").put(Order.update);

   app.route("/api/v1/order/:orderId").delete(Order.delete);
};
