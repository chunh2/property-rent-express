"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("property_types", [
      {
        name: "flat",
      },
      {
        name: "apartment",
      },
      {
        name: "condominium",
      },
      {
        name: "service_apartment",
      },
      {
        name: "terrace",
      },
      {
        name: "semi_d",
      },
      {
        name: "bungalow",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("property_types", null, {});
  },
};
