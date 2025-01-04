import mongoose, { Document, Schema } from 'mongoose';

export interface ITokensForSale extends Document {
    seller: string;
    land_hash: string;
    price: number;
    number_of_tokens: number;
    number_sold: number;
}

const tokensForSaleSchema: Schema = new Schema({
    seller: { type: String, required: true },
    land_hash: { type: String, required: true },
    price: { type: Number, required: true },
    number_of_tokens: { type: Number, required: true },
    number_sold: { type: Number, required: true },
});

export const TokensForSaleModel = mongoose.model<ITokensForSale>('TokensForSale', tokensForSaleSchema);
