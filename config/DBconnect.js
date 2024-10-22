import mongoose from "mongoose";

export const connectToMongoDB = async (url) => {
  try {
    await mongoose.connect(url).then(() => console.log("MongoDB connected!"));
  } catch {
    console.log("Error connecting database!");
  }
};
