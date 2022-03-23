const { default: mongoose } = require("mongoose");
const { model, Schema } = require("mongoose");

const UserSchema = Schema({
  firstname: {
    type: String,
    required: true,
    $nin: ["event", "events"],
    lowercase: true,
  },
  lastname: {
    type: String,
    required: true,
    $nin: ["event", "events"],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
      "Minimum eight characters, at least one capital letter and one number and one special charachter",
    ],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },

  booked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = model("User", UserSchema);
