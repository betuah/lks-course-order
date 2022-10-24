const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const should = chai.should();
const fs = require("fs");
const app = require("../app");
const env = require("../env");
const config = require("../config/aws");
const { ddbClient } = require("../config/database");
const { DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
chai.use(chaiHttp);

describe("Order API CRUD Test", () => {
   describe("Run Order Testing", () => {
      it("Create order must be success", (done) => {
         let courseData = {
            order_id: "TEST_001",
            items: [
               {
                  course_id: "AWS_001",
                  price: 50000,
                  qty: 2,
               },
               {
                  course_id: "IOT_001",
                  price: 100000,
                  qty: 1,
               },
            ],
            payment_method: "virtual_account",
            bank: "mandiri",
         };

         chai
            .request(app)
            .post("/api/v1/order")
            .send(courseData)
            .end((err, res) => {
               res.should.have.status(200);
               expect(res.body).to.have.property("status");
               expect(res.body).to.have.property("code");
               expect(res.body).to.have.property("data");
               res.body.status.should.equal("OK");
               done();
            });
      });

      it("Get all order must be success", (done) => {
         chai
            .request(app)
            .get("/api/v1/order")
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a("object");
               res.body.status.should.equal("OK");
               res.body.data.should.not.empty;
               res.body.data.should.be.a("array");
               done();
            });
      });

      it("Get order by ID must be success", (done) => {
         chai
            .request(app)
            .get("/api/v1/order/TEST_001")
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a("object");
               res.body.status.should.equal("OK");
               res.body.data.should.not.empty;
               done();
            });
      });

      it("Update order must be success", (done) => {
         let courseData = {
            order_id: "TEST_001",
            items: [
               {
                  course_id: "AWS_001",
                  price: 50000,
               },
               {
                  course_id: "IOT_001",
                  price: 100000,
               },
            ],
            payment_method: "virtual_account",
            bank: "bca",
         };

         chai
            .request(app)
            .put("/api/v1/order")
            .send(courseData)
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a("object");
               res.body.status.should.equal("OK");
               res.body.data.should.not.empty;
               res.body.data.bank.should.equal("bca");
               done();
            });
      });

      it("Delete order by ID must be success", (done) => {
         chai
            .request(app)
            .delete("/api/v1/order/TEST_001")
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a("object");
               res.body.status.should.equal("OK");
               expect(res.body).to.have.property("message");
               done();
            });
      });
   });
});
