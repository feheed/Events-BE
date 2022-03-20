const { model, Schema } = require("mongoose");

const UserSchema = Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },

  username: {
    // max: [15, "Username must between 4 & 15 character"],
    // min: [5],
    type: String,
    required: true,
    $nin: ["account"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // match: [
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    //   "Minimum eight characters, at least one letter and one number",
    // ],
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

  phonenumber: {
    type: Number,
    required: true,
    unique: true,
  },

  civilId: {
    type: Number,
    required: true,
    unique: true,
  },

  account: {
    type: Number,
    unique: true,
  },
  amount: {
    type: Number,
  },
  // profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
});

module.exports = model("User", UserSchema);
