const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("Category", CategorySchema);
