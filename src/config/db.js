import mongoose from "mongoose";

const mongoDBUrl =
  "mongodb+srv://Sparsh47:sparsh123@cluster0.eoopksh.mongodb.net/?retryWrites=true&w=majority";

const connectDB = () => {
  return mongoose.connect(mongoDBUrl);
};

export default connectDB;
