import mongoose from "mongoose";

const globalWithMongoose = global as typeof global & { mongoose: { conn: any; promise: Promise<any> | null } };

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (globalWithMongoose.mongoose.conn) {
    console.log("Using existing database connection");
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose.promise) {
    globalWithMongoose.mongoose.promise = mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      console.log("DB connected successfully");
      return mongoose;
    });
  }

  globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
  return globalWithMongoose.mongoose.conn;
}
