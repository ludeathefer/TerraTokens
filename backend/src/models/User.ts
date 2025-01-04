import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    user_public_key:string,
    username:string,
    email:string,
    phone_number:string,
    current_tokens:Array<{hash:string; quantity:number}>
}

const userSchema : Schema = new Schema({
  user_public_key:{type:String,required:true},
  username:{type:String,required:true},
  email:{type:String,required:true},
  phone_number:{type:String,required:true},
  current_tokens:[{
      hash:{type:String,required:false},
      quantity:{type:Number,required:false}
  }]
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
