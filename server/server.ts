import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config({ path: "../.env" });

const dataBaseString = process.env.DB_STRING as string;

const port = process.env.PORT;

mongoose.connect(dataBaseString).then(() => {
  console.log("DB connected successfully");

  app.listen(port, () => {
    if (process.env.NODE_ENV === "development")
      console.log(`Server running in ${process.env.NODE_ENV} on port: ` + port);
    if (process.env.NODE_ENV === "production")
      console.log(`Server running in ${process.env.NODE_ENV} on port: ` + port);
  });
});
