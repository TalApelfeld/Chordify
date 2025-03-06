import mongoose, { Schema } from "mongoose";

interface ICity {
  cities: string[];
}

const citySchema = new Schema<ICity>({
  cities: [String],
});

export const City = mongoose.model<ICity>("city", citySchema);
