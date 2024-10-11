import { validationResult } from "express-validator";
import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { Assignment } from "../models/assignment.model";
import { Admin } from "../models/admin.models";


export const tokenOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 846400000,
};

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }

  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) throw new ApiError("User Already Exists", 400);
    user = await User.create(req.body);
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token, tokenOptions);
    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: "Something Went Wrong while Creating a new User",
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      message: error.array(),
    });
  }
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
  });
  if (!user) throw new ApiError("User not Found", 400);
  const validPwd =await user.isPasswordValid(password)
  if (!validPwd) throw new ApiError("Invalid Password", 400);
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  );
  res.cookie("token", token, tokenOptions);
  return res.status(200).json({
    success:true,
    message:"User logged in Successfully",
    userId: user._id
  })
});

const uploadAssignment =asyncHandler( async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      message: error.array(),
    });
  }
  try {
    const { task, adminId } = req.body;
    const userId = req.user;
    const assignment = new Assignment({ userId, task, admin: adminId });
    await assignment.save();
    return res.status(201).json({ 
      message: 'Assignment uploaded successfully',
      assignment

     });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading assignment', error });
  }
});
const getAdmins = asyncHandler( async (req, res) => {
  try {
    const admins = await Admin.find({}, 'name email');
    return res.status(200).json({
      admins:admins

    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error });
  }
});

export {
    registerUser,
    loginUser,
    uploadAssignment,
    getAdmins
}
