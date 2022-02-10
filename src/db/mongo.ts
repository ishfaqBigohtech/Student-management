import mongoose from "mongoose";

export const connectWithMongo = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/userManagement");
    console.log("Connected with MongoDB!!");
  } catch (ex) {
    console.log("Error while connecting to MongoDB! ", ex);
  }
};
