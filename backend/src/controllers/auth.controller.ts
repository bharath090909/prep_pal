import type { Request, Response } from "express";
import { prisma } from "../../utils/prisma.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate 4 digit OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Helper to sign auth JWT (DRY extraction)
const signAuthToken = (userId: number, isUserVerified: boolean) =>
  jwt.sign({ userId, isUserVerified }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

// Helper to sign and set the auth cookie (DRY for controllers)
const setAuthTokenCookie = (
  res: Response,
  userId: number,
  isUserVerified: boolean
) => {
  const token = signAuthToken(userId, isUserVerified);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
  });
  return token;
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });
    if (userExists) {
      return res
        .status(200)
        .json({ message: "User already exists", status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const otp = generateOTP();
    await prisma.oTP.create({
      data: {
        code: otp,
        userId: user.id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
      },
    });

    setAuthTokenCookie(res, user.id, user.isUserVerified);

    return res.status(200).json({
      message: "User registered successfully, OTP sent to email",
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(200)
      .json({ message: "Internal server error", status: 500 });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { otp } = req.body;
  const userId = req.userId; // Extracted from authMiddleware

  try {
    const record = await prisma.oTP.findFirst({
      where: { userId: userId },
    });

    if (!record) {
      return res.status(200).json({ message: "OTP not found", status: 400 });
    }

    if (record.expiresAt < new Date()) {
      return res.status(200).json({ message: "OTP has expired", status: 400 });
    }

    if (record.code !== otp) {
      return res.status(200).json({ message: "Invalid OTP", status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isUserVerified: true },
    });

    await prisma.oTP.delete({
      where: { userId: userId },
    });

    setAuthTokenCookie(res, userId, true);

    return res
      .status(200)
      .json({ message: "OTP verified successfully", status: 200 });
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ message: "Internal server error", status: 500 });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExists = await prisma.user.findFirst({
    where: { email },
  });

  if (!userExists)
    return res
      .status(200)
      .json({ message: "Invalid Credentials!", status: 401 });
  const isPassword = await bcrypt.compare(password, userExists?.password);

  if (!isPassword)
    return res
      .status(200)
      .json({ message: "Invalid Credentials!", status: 401 });

  const token = setAuthTokenCookie(
    res,
    userExists.id,
    userExists.isUserVerified
  );

  if (!userExists?.isUserVerified) {
    const otp = generateOTP();
    const otpRecord = await prisma.oTP.findFirst({
      where: { userId: userExists.id },
    });
    if (otpRecord) {
      // Update existing OTP
      await prisma.oTP.update({
        where: { userId: userExists.id },
        data: {
          code: otp,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
        },
      });
    } else {
      await prisma.oTP.create({
        data: {
          code: otp,
          userId: userExists.id,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
        },
      });
    }
    return res.status(200).json({
      message: "Email not verified, OTP sent to your registered Email",
      status: 403,
    });
  }

  return res
    .status(200)
    .json({ message: "User logged in successfully", status: 200 });
};
