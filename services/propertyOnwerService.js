const {
  Property,
  User,
  PropertyType,
  State,
  PropertyStatus,
  PropertyImage,
} = require("../models");
const { storePropertyImageService } = require("./propertyImageService");

const addPropertyService = async (data, decoded, files) => {
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

  // store images
  const propertyImages = await storePropertyImageService(property.id, files);

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
      {
        model: PropertyImage,
        as: "property_images",
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

const getPropertyService = async (id, user_id) => {
  const property = await Property.findByPk(id, {
    include: [
      {
        model: PropertyType,
        as: "property_type",
        attributes: ["name"],
      },
      {
        model: State,
        as: "state",
        attributes: ["name"],
      },
      {
        model: PropertyStatus,
        as: "property_status",
        attributes: ["name"],
      },
      {
        model: PropertyImage,
        as: "property_images",
      },
    ],
  });

  // if property not found
  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }

  // 403 Forbidden
  if (property?.user_id !== Number(user_id)) {
    const error = new Error(
      "You do not have permission to access this resource"
    );
    error.statusCode = 403;
    throw error;
  }

  return property;
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
  getPropertyService,
  updatePropertyService,
  deletePropertyService,
};
