import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

export const connectDB = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "AutoCare",
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
  
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.error(" Error connecting MONGODB:", error);
    process.exit(1);
  }
};

export default connectDB;
