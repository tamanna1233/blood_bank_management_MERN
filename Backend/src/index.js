import cluster from "cluster";
import os from "os"
import {app} from "./app.js"
import dbConnect from "./db/index.js";
// Define the number of CPU cores
const numCPUs = os.cpus().length;
// console.log(numCPUs)
if (cluster.isPrimary) {
  console.log(`Master process is running. Forking ${numCPUs} workers...`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });

} else {
  // Worker process logic
  // console.log(`Worker ${process.pid} started`);

  // Database connection and server start
  dbConnect()
    .then(() => {
      const PORT = process.env.PORT || 8000;
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} by worker ${process.pid}`);
      });
    })
    .catch((error) => {
      console.error(`Failed to connect to the database: ${error.message}`);
    });
}
