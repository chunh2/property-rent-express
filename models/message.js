"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.ChatRoom, {
        foreignKey: "chat_room_id",
        as: "chat_room",
        onDelete: "CASCADE",
      });

      Message.belongsTo(models.User, {
        foreignKey: "sender_id",
        as: "sender",
        onDelete: "SET NULL",
      });
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      chat_room_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "chat_rooms",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      sender_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "users",
          key: "user_id",
        },
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "Message",
      tableName: "messages",
      timestamps: true,
    }
  );
  return Message;
};
