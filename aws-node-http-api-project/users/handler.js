import mongoose from "mongoose";
import { config } from "dotenv";
config();

mongoose.connect(process.env.DB_URL, {}, (err) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("Connected to MongoDB");
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
    enum: ["male", "female", "other"],
  },
});

const UserModel = mongoose.model("users", userSchema);

export const createUser = async (event, context, callback) => {
  try {
    const body = JSON.parse(event.body);
    if (!validateData(body))
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid data!",
        }),
      };
    const user = await createUserDB({ name: body.name, gender: body.gender });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User created successfully",
        data: user,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Server error",
    };
  }
};

export const getUsers = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const data = await getUsersDB();
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: data,
        message: "Users data",
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Server error",
    };
  }
};

export const updateUser = async (event, context, callback) => {
  try {
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);
    if (!validateData(body))
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid data!",
        }),
      };
    const data = await updateUserDB(body, id);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User updated successfully!",
        data: body,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Server error",
    };
  }
};

export const deleteUser = async (event, context, callback) => {
  try {
    const { id } = event.pathParameters;
    await deleteUserDB(id);
    return {
      statusCode: 200,
      body: "User deleted successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Server error",
    };
  }
};

const validateData = (data) => {
  if (!data.name) return false;
  if (!data.gender || !["male", "female", "other"].includes(data.gender))
    return false;
  return true;
};

const createUserDB = async (data) => {
  return await UserModel.create(data);
};
const getUsersDB = async () => {
  return await UserModel.find();
};
const updateUserDB = async (data, id) => {
  return await UserModel.findByIdAndUpdate(id, data);
};
const deleteUserDB = async (id) => {
  return await UserModel.remove({ _id: id });
};
