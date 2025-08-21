import { genericRes } from "@/helpers/response";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/Message";
import UserModel from "@/model/User";

export async function POST(req: Request) {
  await dbConnect();
  const { username, content } = await req.json();

  try {
    const user = await UserModel.findOne({ username });
    if (!user) return genericRes("user not found", 404);

    if (!user.isAcceptingMessage)
      return genericRes("user is not accepting the message", 403);

    const newMessage = { content, createAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();
    return genericRes("Message send successfully", 200, true);
  } catch (error) {
    return genericRes("Internal server error", 500);
  }
}
