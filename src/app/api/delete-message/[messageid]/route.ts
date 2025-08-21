import { genericRes } from "@/helpers/response";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function DELETE(
  req: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) return genericRes("Not Authenticated", 401);

  try {
    const updatedResult = await UserModel.updateOne(
      {
        _id: user._id,
      },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updatedResult.modifiedCount == 0)
      return genericRes("Message not found or already delete", 404);
    return Response.json(
      {
        success: true,
        messages: "Message Deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    return genericRes("Error Deleting message", 500);
  }
}
