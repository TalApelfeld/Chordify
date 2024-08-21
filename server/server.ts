import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config({ path: "../.env" });

const dataBaseString = process.env.DB_STRING as string;

const port = process.env.PORT;

mongoose.connect(dataBaseString).then(() => {
  console.log("DB connected successfully");

  app.listen(port, () => {
    console.log("Server running on port: " + port);
  });
});
