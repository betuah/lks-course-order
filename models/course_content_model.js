const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CourseContent = sequelize.define(
   "tbl_course_content",
   {
      contentId: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         unique: true,
         allowNull: false,
         autoIncrement: true,
      },
      contentNumber: {
         type: DataTypes.INTEGER,
      },
      courseId: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      courseName: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      contentTitle: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      contentVideo: {
         type: DataTypes.STRING,
      },
   },
   {
      freezeTableName: true,
      timestamps: true,
   }
);

module.exports = CourseContent;
