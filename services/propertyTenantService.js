const {
  Property,
  PropertyType,
  State,
  PropertyStatus,
  PropertyImage,
  User,
} = require("../models");
const { Op } = require("sequelize");

const getPropertiesService = async (data) => {
  const {
    page = 1,
    limit = 20,
    state_id,
    property_type_id,
    min_price,
    max_price,
    search,
  } = data;

  //   Conditions START

  const whereConditions = {
    // only available or pending status
    property_status_id: { [Op.in]: [1, 2] },
  };

  if (state_id) {
    whereConditions.state_id = state_id;
  }

  if (property_type_id) {
    whereConditions.property_type_id = property_type_id;
  }

  if (min_price && max_price) {
    whereConditions.price = {
      [Op.between]: [min_price, max_price],
    };
  } else if (min_price) {
    whereConditions.price = {
      [Op.gte]: min_price,
    };
  } else if (max_price) {
    whereConditions.price = {
      [Op.lte]: max_price,
    };
  }

  if (search) {
    whereConditions.title = {
      [Op.like]: `%${search}%`,
    };
  }

  const offset = (page - 1) * limit;

  //   Conditions END

  const { rows: properties } = await Property.findAndCountAll({
    where: whereConditions,
    offset,
    limit,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: PropertyType,
        as: "property_type",
        attributes: ["id", "name"],
      },
      {
        model: State,
        as: "state",
        attributes: ["id", "name"],
      },
      {
        model: PropertyStatus,
        as: "property_status",
        attributes: ["id", "name"],
      },
      {
        model: PropertyImage,
        as: "property_images",
        attributes: ["id", "image_path"],
      },
      {
        model: User,
        as: "user",
        attributes: ["user_id", "name"],
      },
    ],
  });

  const count = properties?.length;

  if (count <= 0) {
    const error = new Error("Properties not found");
    error.statusCode = 404;
    throw error;
  }

  return { properties, count };
};

module.exports = { getPropertiesService };
