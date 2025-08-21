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
    toast(res.data.message);
    onMessageDelete(message._id);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent />
      </Card>
    </>
  );
}

export default MessageCard;
