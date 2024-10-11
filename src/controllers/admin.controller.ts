import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/admin.models';
import { Assignment } from '../models/assignment.model';
import { tokenOptions } from './user.controller';
import asyncHandler from '../utils/asyncHandler';
import { validationResult } from 'express-validator';


 const registerAdmin = asyncHandler( async(req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        message: error.array(),
      });
    }

  try {
    const { fullName, email, password } = req.body;
    const admin = new Admin({ fullName, email, password });
    await admin.save();
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' });
    res.cookie("token" , token , tokenOptions)
    res.status(200).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering admin', error });
  }
})

 const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
    const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      message: error.array(),
    });
  }
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.isPasswordValid(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' });
    res.cookie("token" , token , tokenOptions)
    return res.status(200).json({
        success:true,
        message:"User logged in Successfully"
    })
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
})

 const getAssignments = asyncHandler(async (req, res) => {
  try {
    const adminId = req.user;
    const assignments = await Assignment.find({ admin: adminId }).populate('userId', 'fullName');
    return res.status(200).json({
        success:true,
        assignments:assignments
    })
  } catch (error) {
    res.status(400).json({ message: 'Error fetching assignments', error });
  }
})

 const acceptAssignment = asyncHandler(async (req, res) => {
 
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json({ message: 'Assignment accepted successfully', assignment });
  } catch (error) {
    res.status(400).json({ message: 'Error accepting assignment', error });
  }
})

 const rejectAssignment = asyncHandler(async(req, res) => {
 
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json({ message: 'Assignment rejected successfully', assignment });
  } catch (error) {
    res.status(400).json({ message: 'Error rejecting assignment', error });
  }
})

export {
    registerAdmin,
    loginAdmin,
    acceptAssignment,
    rejectAssignment,
    getAssignments
}