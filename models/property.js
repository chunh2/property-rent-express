"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Property.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bedroom: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
      },
      bathroom: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Property",
      tableName: "properties",
      timestamps: true,
    }
  );
  return Property;
};
