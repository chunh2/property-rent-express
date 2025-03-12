"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChatRoom.hasMany(models.ChatMember, {
        foreignKey: "chat_room_id",
        as: "chat_members",
      });

      ChatRoom.hasMany(models.Message, {
        foreignKey: "chat_room_id",
        as: "messages",
      });
    }
  }
  ChatRoom.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
    },
    {
      sequelize,
      modelName: "ChatRoom",
      tableName: "chat_rooms",
      timestamps: true,
      updatedAt: false,
    }
  );
  return ChatRoom;
};
