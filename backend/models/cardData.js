import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  information: { type: String, required: true },
  category: { type: String, enum: ["summer", "winter", "rain"] },
  image: { type: String},
},{ timestamps: true });

export const Card = mongoose.model("Card", cardSchema);

