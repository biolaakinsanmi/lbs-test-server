'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Classroom, {
        foreignKey: 'classroomId',
        onDelete: 'CASCADE'
      });
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'First Name is required'
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Last Name is required'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Email is required'
      },
      unique: {
        args: true,
        msg: 'User with same email already exists.'
      }
    },
    classroomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};