"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyImage.belongsTo(models.Property, {
        foreignKey: "property_id",
        as: "property",
        onDelete: "CASCADE",
      });
    }
  }
  PropertyImage.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      image_path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      property_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "properties",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "PropertyImage",
      tableName: "property_images",
      timestamps: true,
      updatedAt: false,
    }
  );
  return PropertyImage;
};
