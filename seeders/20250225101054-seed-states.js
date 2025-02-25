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
    await queryInterface.bulkInsert("states", [
      {
        name: "Johor",
      },
      {
        name: "Kedah",
      },
      {
        name: "Kelantan",
      },
      {
        name: "Melaka",
      },
      {
        name: "Negeri Sembilan",
      },
      {
        name: "Pahang",
      },
      {
        name: "Penang",
      },
      {
        name: "Perak",
      },
      {
        name: "Perlis",
      },
      {
        name: "Selangor",
      },
      {
        name: "Terengganu",
      },
      {
        name: "Sabah",
      },
      {
        name: "Sarawak",
      },
      {
        name: "Kuala Lumpur",
      },
      {
        name: "Labuan",
      },
      {
        name: "Putrajaya",
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
    await queryInterface.bulkDelete("states", null, {});
  },
};
