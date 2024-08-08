import mongoose, { Schema } from "mongoose";

const chordSchema = new Schema({
  name: { type: String, required: [true, "Name needs to be provided !"] },

  url: { type: String, required: [true, "Url needs to be provided !"] },

  bulletPoints: {
    type: [String],
    required: [true, "BulletPoints needs to be provided !"], // Array of strings
  },
});

const Chords = mongoose.model("chord", chordSchema);

export default Chords;
