import mongoose, { Schema, Document, Model } from "mongoose";

interface IChord {
  [key: string]: string;
}

interface ILyricLine {
  chords: string[];
  text: string;
}

interface ISection {
  type: string;
  chords?: string[];
  lyrics?: ILyricLine[];
}

interface ISong extends Document {
  title: string;
  artist: string;
  chords: IChord;
  strumming_pattern: string[];
  sections: ISection[];
}

const LyricLineSchema = new Schema<ILyricLine>({
  chords: { type: [String], required: true },
  text: { type: String, required: true },
});

const SectionSchema = new Schema<ISection>({
  type: { type: String, required: true },
  chords: { type: [String] },
  lyrics: { type: [LyricLineSchema] },
});

const SongSchema = new Schema<ISong>({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  chords: { type: Map, of: String, required: true },
  strumming_pattern: { type: [String], required: true },
  sections: { type: [SectionSchema], required: true },
});

const Song: Model<ISong> = mongoose.model<ISong>("Song", SongSchema);

export default Song;
