import mongoose, { Document, Schema } from 'mongoose';

export type AssignmentType = {
  userId: Schema.Types.ObjectId;
  task: string;
  admin: Schema.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: Date;
}

const AssignmentSchema = new Schema<AssignmentType>({
  userId: {
     type: Schema.Types.ObjectId, 
     ref: 'User',
      required: true 
    },

  task: {
     type: String, 
     required: true,
     unique :true
     },
  admin: { 
    type: Schema.Types.ObjectId, 
    ref: 'Admin',
     required: true
     },
  status: {
     type: String, 
     enum: ['pending', 'accepted', 'rejected'],
      default: 'pending' 
    },
  submittedAt: { type: Date, default: Date.now },
});

export  const Assignment = mongoose.model('Assignment', AssignmentSchema);