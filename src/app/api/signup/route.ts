import { sendVerificationEmail } from "@/helper/sendEmail";
import { UserModel } from "@/models/user.model";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  try {
    const { username, password, email } = await req.json();
    const isExistingUserbyUserName = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (isExistingUserbyUserName) {
      return NextResponse.json(
        {
          success: false,
          message: "User with this username already exists",
        },
        { status: 400 }
      );
    }
    const isUserExistByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.round(Math.random() * 900000 + 100000);
    const verifyCodeExpiry = new Date();
    verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);
    if (isUserExistByEmail) {
      if (isUserExistByEmail.isVerified) {
        NextResponse.json(
          {
            success: false,
            message: "User already exists",
          },
          { status: 400 }
        );
      } else {
        isUserExistByEmail.password = await bcrypt.hash(password, 10);
        isUserExistByEmail.verifyCode = String(verifyCode);
        isUserExistByEmail.verifyCodeExpiry = verifyCodeExpiry;
        await isUserExistByEmail.save();
        sendVerificationEmail(email, username, String(verifyCode));
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry,
        isVerified: false,
        messages: [],
      });
    }
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      String(verifyCode)
    );
    if (!emailResponse.success) {
      NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    NextResponse.json(
      {
        success: true,
        message: "User registerd successfully , please verify your email",
      },
      { status: 201 }
    );
    // Sending verification email
  } catch (error) {
    console.log(`Error while signin up`);
    NextResponse.json({
      success: false,
      message: "Error while sign up user",
    });
  }
};
