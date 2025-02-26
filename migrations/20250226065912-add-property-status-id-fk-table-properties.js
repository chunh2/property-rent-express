"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("properties", "property_status_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "property_statuses",
        key: "id",
      },
      onDelete: "RESTRICT",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("properties", "property_status_id");
  },
};
