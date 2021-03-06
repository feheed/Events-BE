const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  fetchCategory,
  getCategories,
  createCategory,
} = require("./categories.controllers");

router.param("categoryId", async (req, res, next, categoryId) => {
  const foundcategory = await fetchCategory(categoryId, next);
  if (foundcategory) {
    req.category = foundcategory;
    next();
  } else next({ status: 404 });
});

router.get("/", getCategories);
router.post("/", createCategory);

module.exports = router;
