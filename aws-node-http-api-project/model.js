import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL, {}, (err) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("Connected to MongoDB");
  }
});

const userSchema = new mongoose.Schema({
  name: String,
  gender: String,
  enum: ["male", "female", "other"],
});

const UserModel = mongoose.model("users", userSchema);

module.exports.createUser = async function (data) {
  return await UserModel.create(data);
};
