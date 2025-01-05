import mongoose, { Document, Schema } from "mongoose";

export interface IDailyToken extends Document {
  token: string;
  date: string;
  price: number;
}

const dailyTokenSchema: Schema = new Schema({
  token: { type: String, required: true },
  date: { type: String, required: true },
  price: { type: Number, required: true },
});

export const DailyTokenModel = mongoose.model<IDailyToken>(
  "DailyToken",
  dailyTokenSchema
);
