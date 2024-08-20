import mongoose from "mongoose";

export interface ISong extends Document {
  title: string;
  chordsUsed: string[]; // An array of strings
  chordProgression: string[][]; // An array of arrays of strings;
  strummingPattern: string[];
  difficulty?: String;
}

const songSchema = new mongoose.Schema<ISong>({
  title: {
    type: String,
  },

  chordsUsed: {
    type: [String],
  },

  chordProgression: { type: [[String]] },

  strummingPattern: { type: [String] },

  difficulty: { type: String },
});

const Song = mongoose.model<ISong>("song", songSchema);
export default Song;
