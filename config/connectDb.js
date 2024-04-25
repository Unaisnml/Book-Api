import mongoose from "mongoose";

const url = process.env.MONGO_URL;
const connectDb = async () => {
  const connection = await mongoose.connect(url);
  console.log(`Database is connected to ${connection.connection.host}`);
};

export { connectDb };
