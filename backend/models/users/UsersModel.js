const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("users", UsersSchema);

module.exports = Users;
