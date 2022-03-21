const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");

const { eventListFetch, eventCreate } = require("./events.controllers");
const router = express.Router();
router.get("/", eventListFetch);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  eventCreate
);

module.exports = router;
