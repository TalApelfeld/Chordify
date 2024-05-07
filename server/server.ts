import app from "./app";
import mongoose from "mongoose";

const dataBase =
  "mongodb+srv://talapelfeld:tal2285903@chordifydb.98cezsi.mongodb.net/chordify?retryWrites=true&w=majority&appName=chordifyDB";
const port = 3000;

mongoose.connect(dataBase).then(() => {
  console.log("DB connected successfully");

  app.listen(port, () => {
    console.log("Server running on port: " + port);
  });
});
