const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const should = chai.should();
const fs = require("fs");
const app = require("../app");
const env = require("../env");
const {
   S3Client,
   PutObjectCommand,
   DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
// Course Model
const CourseModel = require("../models/course_model");
chai.use(chaiHttp);

const s3 = new S3Client({
   credentials: {
      accessKeyId: env.aws.accessKeyId,
      secretAccessKey: env.aws.secretAccessKey,
   },
   region: env.aws.bucketRegion,
});

describe("Course API Task", () => {
   describe("Get All course Task", () => {
      beforeEach((done) => {
         CourseModel.destroy({ where: {}, truncate: true }).then(done());
      });
      it("Response must have properties status, error_code, message, and data", (done) => {
         chai
            .request(app)
            .get("/api/v1/catalog")
            .end((err, res) => {
               expect(res.body).to.have.property("status");
               expect(res.body).to.have.property("error_code");
               expect(res.body).to.have.property("message");
               expect(res.body).to.have.property("data");
               done();
            });
      });
      it("Response must be successful even though the data does not exist", (done) => {
         chai
            .request(app)
            .get("/api/v1/catalog")
            .end((err, res) => {
               expect(res).to.have.status(200);
               expect(res.body).to.have.property("status").equal("SUCCESS");
               done();
            });
      });
      it("Response data must be empty when no data available", (done) => {
         chai
            .request(app)
            .get("/api/v1/catalog")
            .end((err, res) => {
               expect(res).to.have.status(200);
               expect(res).to.have.property("status");
               expect(res.body.status).to.equal("SUCCESS");
               expect(res.body.data).to.have.lengthOf(0);
               done();
            });
      });
   });
   describe("Create Course Task", () => {
      beforeEach((done) => {
         CourseModel.create({
            courseId: "TEST_O1",
            courseName: "Testing Course",
            courseDesc: "This is for test descriptions",
            courseCategory: "Testing category",
            courseLevel: "Beginner",
            price: 150000,
         })
            .then((data) => {
               done();
            })
            .catch((err) => {
               done();
            });
      });

      afterEach((done) => {
         CourseModel.destroy({ where: {}, truncate: true }).then(done());
      });

      it("POST response must be have property", (done) => {
         let courseData = {
            courseId: "TEST_O2",
            courseName: "Testing Course",
            courseDesc: "This is for test descriptions",
            courseCategory: "Testing category",
            courseLevel: "Beginner",
            price: 150000,
         };

         chai
            .request(app)
            .post("/api/v1/catalog")
            .send(courseData)
            .end((err, res) => {
               expect(res.body).to.have.property("status");
               expect(res.body).to.have.property("error_code");
               expect(res.body).to.have.property("message");
               expect(res.body).to.have.property("data");
               done();
            });
      });

      it("POST course should be success and have response data", (done) => {
         let courseData = {
            courseId: "TEST_O2",
            courseName: "Testing Course",
            courseDesc: "This is for test descriptions",
            courseCategory: "Testing category",
            courseLevel: "Beginner",
            price: 150000,
         };

         chai
            .request(app)
            .post("/api/v1/catalog")
            .send(courseData)
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a("object");
               res.body.status.should.equal("SUCCESS");
               res.body.data.should.not.empty;
               done();
            });
      });

      it("POST course with file upload should be success and have response data", (done) => {
         chai
            .request(app)
            .post("/api/v1/catalog")
            .set("Content-Type", "application/x-www-form-urlencoded")
            .field("courseId", "TEST_O2")
            .field("courseName", "Testing Course")
            .field("courseDesc", "This is for test descriptions")
            .field("courseCategory", "Testing category")
            .field("courseLevel", "Beginner")
            .field("price", 150000)
            .attach(
               "coverImage",
               fs.readFileSync(__dirname + "/assets/imageTest.png"),
               "imageTest.png"
            )
            .end(async (err, res) => {
               res.should.have.status(200);
               res.body.should.be.a("object");
               res.body.status.should.equal("SUCCESS");
               res.body.data.should.not.empty;
               expect(res.body.data)
                  .to.have.property("coursePics")
                  .not.equal(null);

               try {
                  const params = {
                     Bucket: env.aws.bucketName,
                     Key: res.body.data.coursePics,
                  };
                  const command = new DeleteObjectCommand(params);
                  await s3.send(command);
                  done();
               } catch (error) {
                  done();
               }
            });
      });

      it("POST course should be error when courseId is not unique", (done) => {
         let courseData = {
            courseId: "TEST_O1",
            courseName: "Testing Course",
            courseDesc: "This is for test descriptions",
            courseCategory: "Testing category",
            courseLevel: "Beginner",
            price: 150000,
         };

         chai
            .request(app)
            .post("/api/v1/catalog")
            .send(courseData)
            .end((err, res) => {
               expect(res).to.have.status(500);
               expect(res.body).to.have.property("status").equal("ERROR");
               expect(res.body)
                  .to.have.property("error_code")
                  .equal("SequelizeUniqueConstraintError");
               expect(res.body)
                  .to.have.property("message")
                  .equal("courseId must be unique");
               done();
            });
      });

      it("POST course should be error when courseId is empty", (done) => {
         let courseData = {
            courseName: "Testing Course",
            courseDesc: "This is for test descriptions",
            courseCategory: "Testing category",
            courseLevel: "Beginner",
            price: 150000,
         };

         chai
            .request(app)
            .post("/api/v1/catalog")
            .send(courseData)
            .end((err, res) => {
               expect(res).to.have.status(500);
               expect(res.body).to.have.property("status").equal("ERROR");
               expect(res.body)
                  .to.have.property("error_code")
                  .equal("SequelizeValidationError");
               expect(res.body)
                  .to.have.property("message")
                  .equal("tbl_courses.courseId cannot be null");
               done();
            });
      });

      it("POST course should be error when courseName is empty", (done) => {
         let courseData = {
            courseId: "AWS_02",
            courseDesc: "This is for test descriptions",
            courseCategory: "Testing category",
            courseLevel: "Beginner",
            price: 150000,
         };

         chai
            .request(app)
            .post("/api/v1/catalog")
            .send(courseData)
            .end((err, res) => {
               expect(res).to.have.status(500);
               expect(res.body).to.have.property("status").equal("ERROR");
               expect(res.body)
                  .to.have.property("error_code")
                  .equal("SequelizeValidationError");
               expect(res.body)
                  .to.have.property("message")
                  .equal("tbl_courses.courseName cannot be null");
               done();
            });
      });

      it("POST course should be success when just have courseId and courseName", (done) => {
         let courseData = {
            courseId: "AWS_02",
            courseName: "Testing Course",
         };

         chai
            .request(app)
            .post("/api/v1/catalog")
            .send(courseData)
            .end((err, res) => {
               expect(res).to.have.status(200);
               res.body.should.be.a("object");
               expect(res.body).to.have.property("status").equal("SUCCESS");
               done();
            });
      });
   });
   describe("Update Course Task", () => {
      beforeEach((done) => {
         CourseModel.create({
            courseId: "TEST_O1",
            courseName: "Testing Course",
            courseDesc: "This is for test descriptions",
            courseCategory: "Testing category",
            courseLevel: "Beginner",
            price: 150000,
         })
            .then((data) => {
               done();
            })
            .catch((err) => {
               done();
            });
      });

      afterEach((done) => {
         CourseModel.destroy({ where: {}, truncate: true }).then(done());
      });

      it("Get by id should be success", (done) => {
         chai
            .request(app)
            .get("/api/v1/catalog/TEST_O1")
            .end((err, res) => {
               expect(res).to.have.status(200);
               expect(res.body).to.have.property("status").equal("SUCCESS");
               expect(res.body).to.have.property("data");
               done();
            });
      });

      it("PUT data should be success to update all data", (done) => {
         const updatedata = {
            courseId: "TEST_O1",
            courseName: "Updated course name",
            courseDesc: "Updated description",
            courseCategory: "Updated category",
            courseLevel: "Updated level",
            price: 200000,
         };

         chai
            .request(app)
            .put("/api/v1/catalog")
            .send(updatedata)
            .end((err, res) => {
               expect(res).to.have.status(200);
               expect(res.body).to.have.property("status").equal("SUCCESS");
               expect(res.body).to.have.property("data");
               expect(res.body.data)
                  .to.have.property("courseName")
                  .equal("Updated course name");
               expect(res.body.data)
                  .to.have.property("courseDesc")
                  .equal("Updated description");
               expect(res.body.data)
                  .to.have.property("courseCategory")
                  .equal("Updated category");
               expect(res.body.data)
                  .to.have.property("courseLevel")
                  .equal("Updated level");
               expect(res.body.data).to.have.property("price").equal(200000);
               done();
            });
      });

      it("PUT data shoud be success to update one of data", (done) => {
         chai
            .request(app)
            .put("/api/v1/catalog")
            .send({ courseId: "TEST_O1", price: 200000 })
            .end((err, res) => {
               expect(res).to.have.status(200);
               expect(res.body).to.have.property("status").equal("SUCCESS");
               expect(res.body).to.have.property("data");
               expect(res.body.data).to.have.property("price").equal(200000);
               done();
            });
      });

      it("PUT data should be error when input wrong id", (done) => {
         chai
            .request(app)
            .put("/api/v1/catalog")
            .send({ courseId: "Random", price: 200000 })
            .end((err, res) => {
               expect(res).to.have.status(404);
               expect(res.body).to.have.property("status").equal("ERROR");
               expect(res.body)
                  .to.have.property("error_code")
                  .equal("dataNotFound");
               expect(res.body)
                  .to.have.property("message")
                  .equal("Course not found!");
               done();
            });
      });
   });
   describe("Delete Course Task", () => {
      beforeEach((done) => {
         CourseModel.create({
            courseId: "testid",
            courseName: "Testing Course",
            courseDesc: "This is for test descriptions",
            courseCategory: "Testing category",
            courseLevel: "Beginner",
            price: 150000,
         })
            .then((data) => {
               done();
            })
            .catch((err) => {
               done();
            });
      });

      afterEach((done) => {
         CourseModel.destroy({ where: {}, truncate: true }).then(done());
      });

      it("DELETE data should be success to remove data by id", (done) => {
         chai
            .request(app)
            .delete("/api/v1/catalog/testid")
            .end((err, res) => {
               expect(res).to.have.status(200);
               expect(res.body).to.have.property("status").equal("SUCCESS");
               done();
            });
      });

      it("DELETE data should be error when wrong input id", (done) => {
         chai
            .request(app)
            .delete("/api/v1/catalog/RandomID")
            .end((err, res) => {
               expect(res).to.have.status(404);
               expect(res.body).to.have.property("status").equal("ERROR");
               expect(res.body)
                  .to.have.property("error_code")
                  .equal("dataNotFound");
               expect(res.body)
                  .to.have.property("message")
                  .equal("Course not found!");
               done();
            });
      });
   });
});
