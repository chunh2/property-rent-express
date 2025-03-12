"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChatMember.belongsTo(models.ChatRoom, {
        foreignKey: "chat_room_id",
        as: "chat_room",
        onDelete: "CASCADE",
      });

      ChatMember.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });
    }
  }
  ChatMember.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
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
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "ChatMember",
      tableName: "chat_members",
      timestamps: true,
      updatedAt: false,
    }
  );
  return ChatMember;
};
