const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Courses = sequelize.define(
   "tbl_courses",
   {
      courseId: {
         type: DataTypes.STRING,
         primaryKey: true,
         unique: true,
         allowNull: false,
      },
      courseName: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      courseDesc: {
         type: DataTypes.STRING,
      },
      courseCategory: {
         type: DataTypes.STRING,
      },
      courseLevel: {
         type: DataTypes.STRING,
      },
      coursePics: {
         type: DataTypes.STRING,
      },
      price: {
         type: DataTypes.INTEGER,
      },
   },
   {
      freezeTableName: true,
      timestamps: true,
   }
);

module.exports = Courses;
