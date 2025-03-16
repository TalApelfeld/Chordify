import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import fs from "fs";
import https from "https";
import app from "./app";
import mongoose from "mongoose";

console.log(process.env);

const dataBaseString = process.env.DB_STRING as string;
const port = Number(process.env.PORT) || 3000;
// const options = {
//   key: fs.readFileSync("./server.key"),
//   cert: fs.readFileSync("./server.cert"),
// };

mongoose.connect(dataBaseString).then(() => {
  console.log("DB connected successfully");

  app.listen(port, "0.0.0.0", () => {
    if (process.env.NODE_ENV === "development")
      console.log(
        `Http Server running in ${process.env.NODE_ENV} on port: ` + port
      );
    if (process.env.NODE_ENV === "production")
      console.log(
        `Https Server running in ${process.env.NODE_ENV} on port: ` + port
      );
  });
});
