import mongoose, { ConnectOptions } from 'mongoose';

const uri: string | undefined = process.env.MONGODB_URI;

const connectDB = async (): Promise<void> => {
  try {
    if (uri) {
      await mongoose.connect(uri, {
        family: 4,
      } as ConnectOptions);
      console.log('🎉 connected to database successfully');
    }
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
