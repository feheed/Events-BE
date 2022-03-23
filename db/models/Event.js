const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const Category = require("./Category");

const EventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: { type: String },
    area: { type: String },
    description: { type: String },
    participants: {
      type: Number,
      match: [
        /^[1-9][0-9]?$|^100$/,
        "Please fill numbers starting from 2 participants",
      ],
    },

    joinedparticipants: { type: Number },
    time: { type: String },
    date: { type: String },
    age: {
      type: Number,
      $lt: 65,
      $gt: 1,
      match: [/^[+-]?\d+(\,\\.\d+)?$/, "Age range between 1 and 65"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bookedevent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryId",
    },
  },
  { timestamps: true }
);
EventSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Event", EventSchema);
