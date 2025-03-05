import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import app from "./app";
import mongoose from "mongoose";

const dataBaseString = process.env.DB_STRING as string;
const port = Number(process.env.PORT);

mongoose.connect(dataBaseString).then(() => {
  console.log("DB connected successfully");

  app.listen(port, () => {
    if (process.env.NODE_ENV === "development")
      console.log(`Server running in ${process.env.NODE_ENV} on port: ` + port);
    if (process.env.NODE_ENV === "production")
      console.log(`Server running in ${process.env.NODE_ENV} on port: ` + port);
  });
});
