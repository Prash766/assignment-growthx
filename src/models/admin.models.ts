// src/models/Admin.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export type AdminType= {
  name: string;
  email: string;
  password: string;
  isPasswordValid(password: string): Promise<boolean>;
}

const AdminSchema = new Schema<AdminType>({
  name: { 
    type: String, 
    required: true },
  email: {
     type: String, 
     required: true,
      unique: true 
    },
  password: { 
    type: String, 
    required: true
 },
}
);

AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password , 10 )
  next()
});

AdminSchema.methods.isPasswordValid = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const Admin =  mongoose.model('Admin', AdminSchema);