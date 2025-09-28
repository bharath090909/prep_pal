import type { Request, Response } from "express";
import { prisma } from "../../utils/prisma.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate 4 digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    console.log("Usercreated:", user);

    const otp = generateOTP();
    await prisma.oTP.create({
      data: {
        code: otp,
        userId: user.id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
      },
    });

    const token = jwt.sign(
      { userId: user.id, isUserVerified: user.isUserVerified },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res
      .status(200)
      .json({ message: "User registered successfully, OTP sent to email" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { otp, userId } = req.body;

  try {
    const record = await prisma.oTP.findFirst({
      where: { userId: userId },
    });

    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (record.code !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isUserVerified: true },
    });

    await prisma.oTP.delete({
      where: { userId: userId },
    });

    const token = jwt.sign(
      { userId: userId, isUserVerified: true },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = (req: Request, res: Response) => {
  return res.status(200).json({ message: "User logged in successfully" });
};
