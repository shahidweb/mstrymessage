import { genericRes } from "@/helpers/response";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, code } = await req.json();
    const decodeUser = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodeUser });
    if (!user) {
      return genericRes("User not found", 500);
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (!isCodeValid) return genericRes("Incorrect Verification code", 400);
    if (!isCodeNotExpired)
      return genericRes(
        "Verfication code has expired please signup again to get a new code",
        400
      );
    user.isVerified = true;
    await user.save();
    return genericRes("Account verified successfully", 200, true);
  } catch (error) {
    console.error("Error verifying user", error);
    return genericRes("Error verifying user", 500);
  }
}
