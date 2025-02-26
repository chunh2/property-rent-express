"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyStatus.hasMany(models.Property, {
        foreignKey: "property_status_id",
        as: "properties",
      });
    }
  }
  PropertyStatus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "PropertyStatus",
      tableName: "property_statuses",
      timestamps: true,
      updatedAt: false,
    }
  );
  return PropertyStatus;
};
