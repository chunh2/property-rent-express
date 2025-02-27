const {
  Property,
  User,
  PropertyType,
  State,
  PropertyStatus,
} = require("../models");

const addPropertyService = async (data, decoded) => {
  const { user_id } = decoded;

  //   check if user exists
  const user = await User.findByPk(user_id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  //   create property
  const property = await Property.create({ ...data, user_id });

  if (!property) {
    const error = new Error("Internal server error");
    error.statusCode = 500;
    throw error;
  }

  return property;
};

const getPropertiesService = async (user_id, data) => {
  const {
    page = 1,
    limit = 20,
    sortBy = "createdAt",
    sortOrder = "DESC",
    property_status_id,
  } = data;
  console.log(data);

  // check if user exists
  const user = await User.findByPk(user_id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const offset = (page - 1) * limit;

  const whereConditions = { user_id };

  if (property_status_id) {
    whereConditions.property_status_id = property_status_id;
  }

  //   search for properties
  const { count, rows: properties } = await Property.findAndCountAll({
    where: whereConditions,
    limit,
    offset,
    order: [[sortBy, sortOrder]],
    include: [
      {
        model: PropertyType,
        as: "property_type",
      },
      {
        model: State,
        as: "state",
      },
      {
        model: PropertyStatus,
        as: "property_status",
      },
    ],
  });

  if (!properties.length) {
    const error = new Error("No properties found");
    error.statusCode = 404;
    throw error;
  }

  return { count, properties };
};

const updatePropertyService = async (data, user_id) => {
  const { id } = data;

  // check if user exists
  const user = await User.findByPk(user_id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  //   check if property exists
  const property = await Property.findByPk(id);

  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }

  //   check if user is the owner of the property
  if (property.user_id !== user.user_id) {
    const error = new Error(
      "Unauthorized. You are not the owner of the property"
    );
    error.statusCode = 403;
    throw error;
  }

  //   perform update
  const [numberOfUpdatedRow] = await Property.update(data, {
    where: {
      id,
    },
  });

  if (numberOfUpdatedRow !== 1) {
    const error = new Error("Internal server error");
    error.statusCode = 500;
    throw error;
  }
};

const deletePropertyService = async (id, user_id) => {
  //   check if user exists
  const user = await User.findByPk(user_id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // check if property exists
  const property = await Property.findByPk(id);

  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }

  //   check if user is the owner of the property
  if (property.user_id !== user.user_id) {
    const error = new Error(
      "Unauthorized. You are not the owner of the property"
    );
    error.statusCode = 403;
    throw error;
  }

  //   perform delete
  await property.destroy();
};

module.exports = {
  addPropertyService,
  getPropertiesService,
  updatePropertyService,
  deletePropertyService,
};
