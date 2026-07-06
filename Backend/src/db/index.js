import mongoose from "mongoose";
import { dbname } from "../contant.js";
import dns from "dns/promises";
const dbConnect = async () => {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const connectionInstances = await mongoose.connect(
      `${process.env.MONGODB_URL}/${dbname}`,
    );
    console.log(
      `\n Mongodb is connected || Db host at ${connectionInstances.connection.host}`,
    );
  } catch (error) {
    console.log("Connection error:", error);
    process.exit(1);
  }
};

export default dbConnect;
