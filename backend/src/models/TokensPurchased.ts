import mongoose, { Document, Schema } from 'mongoose';

export interface ITokensPurchased extends Document {
    buyer:string;
    land_hash:string;
    price:number;
    number_of_token:number;
}

const tokensPurchasedSchema : Schema = new Schema({
    buyer:{type:String,required:true},
    land_hash:{type:String,required:true},
    price:{type:Number,required:true},
    number_of_token:{type:Number,required:true},
});

export const TokensPurchasedModel = mongoose.model<ITokensPurchased>('TokensPurchased', tokensPurchasedSchema);
