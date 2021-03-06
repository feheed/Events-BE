const Category = require("../../db/models/Category");

exports.fetchCategory = async (categoryId, next) => {
  try {
    const category = await Category.findById(categoryId);
    return category;
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate("events");
    return res.json(categories);
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const newCat = await Category.create(req.body);
    return res.json(newCat);
  } catch (error) {
    next(error);
  }
};
