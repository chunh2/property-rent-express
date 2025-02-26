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
      Property.belongsTo(models.PropertyType, {
        foreignKey: "property_type_id",
        onDelete: "SET NULL",
        as: "property_type",
      });

      Property.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        as: "user",
      });

      Property.belongsTo(models.State, {
        foreignKey: "state_id",
        as: "state",
        onDelete: "RESTRICT",
      });

      Property.belongsTo(models.PropertyStatus, {
        foreignKey: "property_status_id",
        as: "property_status",
        onDelete: "RESTRICT",
      });
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
      property_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "property_types",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
      state_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "states",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      property_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "property_statuses",
          key: "id",
        },
        onDelete: "RESTRICT",
        defaultValue: 1,
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
