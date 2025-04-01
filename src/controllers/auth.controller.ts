import mongoose from "mongoose";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { catchAsync } from "../middleware/catchAsync";

function createToken(userId: mongoose.Types.ObjectId) {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
}

export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();

  const newUser = {
    ...user.toObject(),
    password: undefined,
  };

  const token = createToken(user._id);
  res.status(201).json({ user: newUser, token });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // hide password
  const modifiedUser = {
    ...user.toObject(),
    password: undefined,
  };

  const token = createToken(user._id);
  res.json({ user: modifiedUser, token });
});
