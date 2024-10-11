import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
export type UserType  = {
    email : string,
    password:string,
    fullName:string,
    isPasswordValid(plainPassword: string): Promise<boolean>;

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

UserSchema.methods.isPasswordValid= async function(password:string): Promise<boolean>{
    return await bcrypt.compare(password , this.password)

}






export const User = mongoose.model("User", UserSchema)