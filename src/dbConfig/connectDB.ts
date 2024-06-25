import mongoose from "mongoose";

let isConnected = false;
export const connectToDb = async (): Promise<void> => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (isConnected) return console.log(`DB already connected`);
  if (!MONGODB_URI) return console.log(`No mongodb_uri Found`);
  try {
    const connectionInstance = await mongoose.connect(MONGODB_URI);
    mongoose.connection.on("connected", () => {
      console.log(`Db connected`);
      isConnected = true;
    });
  } catch (error: any) {
    console.log(`Unable to connect DB`, error.message);
    process.exit(1);
  }
};
