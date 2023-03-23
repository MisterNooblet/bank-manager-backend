import mongoose from 'mongoose';
import { green, italic, bold, red } from 'colors';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log(`MongoDB Connected: ${conn.connection.host}`.green.italic.bold);
  } catch (error) {
    console.log(`Error: ${error}`.red.bold);
  }
};

export default connectDB;
