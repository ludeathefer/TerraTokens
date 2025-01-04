import mongoose, { Document, Schema } from 'mongoose';

export interface ILandToken extends Document {
    land_detail: {
        city: string;
        ward: string;
        street_number: string;
        plot_number: string;
        land_class: string;
    };
    token: string;
}

const landTokenSchema: Schema = new Schema({
    land_detail: {
        city: { type: String, required: true },
        ward: { type: String, required: true },
        street_number: { type: String, required: true },
        plot_number: { type: String, required: true },
        land_class: { type: String, required: true },
    },
    token: { type: String, required: true },
});

export const LandTokenModel = mongoose.model<ILandToken>('LandToken', landTokenSchema);
