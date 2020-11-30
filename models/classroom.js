'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Classroom.hasMany(models.User, {
        foreignKey: 'classroomId'
      });
    }
  };

  Classroom.init({
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Classroom Name is required'
      },
      unique: {
        args: true,
        msg: 'Classroom with same classroom name already exists.'
      }
    },
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Classroom',
  });
  return Classroom;
};