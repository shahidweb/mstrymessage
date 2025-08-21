import { sendVerifcationEmail } from "@/helpers/emails/sendVerificationEmail";
import { genericRes } from "@/helpers/response";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request, res: Response) {
  await dbConnect();
  try {
    const { username, email, password } = await req.json();
    const existingVerifyUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifyUser) {
      return genericRes("Username is already taken", 400);
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return genericRes("User already exist with this email", 400);
      } else {
        const hashedPwd = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPwd;
        ((existingUserByEmail.verifyCode = verifyCode),
          (existingUserByEmail.verifyCodeExpiry = new Date(
            Date.now() + 3600000
          )),
          await existingUserByEmail.save());
      }
    } else {
      const hashedPwd = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPwd,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }
    const emailRes = await sendVerifcationEmail(email, username, verifyCode);
    if (!emailRes.success) {
      return genericRes(emailRes.message, 400);
    }
    return genericRes(
      "User registered successfully. Please verify your email",
      200,
      true
    );
  } catch (error) {
    console.error("Error registering user", error);
    return genericRes("Error registering user", 500);
  }
}
