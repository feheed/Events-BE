const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  events: [{ type: mongoose.Schema.Types.Object, ref: "EventId" }],
});

module.exports = mongoose.model("Category", CategorySchema);
