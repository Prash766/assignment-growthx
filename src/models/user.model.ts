import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
export type UserType  = {
    email : string,
    password:string,
    fullName:string
}


const UserSchema = new Schema<UserType>({
    email:{
        type:String,
        unique:true ,
        required:true

    },
    password:{
        type:String,
        required:true,
    },
    fullName:{
        type:String,
        required:true
    }

}, {timestamps:true})

UserSchema.pre('save' , async function(next){
    if(!this.isModified("password")) return  next()
    this.password = await bcrypt.hash(this.password , 10 )
next()
    
})






export const User = mongoose.model("User", UserSchema)