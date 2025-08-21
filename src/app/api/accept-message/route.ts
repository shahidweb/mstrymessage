import { genericRes } from "@/helpers/response";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) return genericRes("Not Authenticated", 401);

  const userId = user._id;
  const { acceptMessage } = await req.json();

  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessage },
      { new: true }
    );
    if (!updateUser)
      return genericRes("Failed to update user status to accpet message", 401);
    return genericRes(
      "Message acceptance status updated successfully",
      200,
      true
    );
  } catch (error) {
    return genericRes("Failed to update user status to accpet message", 500);
  }
}

export async function GET(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) return genericRes("Not Authenticated", 401);

  const userId = user._id;
  try {
    const foundUser = await UserModel.findById({ userId });
    if (!foundUser) return genericRes("User not found", 401);
    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    return genericRes("Error is getting message accepting status", 500);
  }
}
