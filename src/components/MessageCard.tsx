import { Message } from "@/model/Message";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: any) => void;
};

function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const confirmHandler = () => {
    if (confirm("Press a button!")) {
      handleDeleteConfirm();
    }
  };

  const handleDeleteConfirm = async () => {
    const res = await axios.delete<ApiResponse>(
      `/api/delete-message/${message._id}`
    );
    toast.error(res.data.messages);
    onMessageDelete(message._id);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{message.content}</CardTitle>
          <CardDescription>{new Date(message.createAt).toLocaleString('en-IN')}</CardDescription>
          <CardAction onClick={confirmHandler} className="bg-red-500 text-white px-3 pb-1 rounded-sm cursor-pointer">x</CardAction>
        </CardHeader>
        <CardContent />
      </Card>
    </>
  );
}

export default MessageCard;
