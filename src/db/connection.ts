import mongoose from 'mongoose';

export async function connectToDb() {
  try {
    await mongoose.connect('mongodb://localhost:27017');
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}