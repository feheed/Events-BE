const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const EventSchema = mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  slug: String,
  image: { type: String },
  area: String,
  discreption: String,
  participants: Number,
  time: String,
  age: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
EventSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Event", EventSchema);
