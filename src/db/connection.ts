import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/bulls-and-cows';

export async function connectToDb() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}