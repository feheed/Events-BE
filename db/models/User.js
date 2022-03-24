const { default: mongoose } = require("mongoose");
const { model, Schema } = require("mongoose");

// const validatepassword = (passwords) => {
//   const re = /^(=.*[A-Za-z])(=.*\d)[A-Za-z\d]{8,}$/g;
//   return re.test(passwords);
// };

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },

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
    // validate: [validatepassword, "khalas 3ad"],
    // match: [
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
    //   "Minimum eight characters, at least one letter and one number",
    // ],
  },

  booked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = model("User", UserSchema);
