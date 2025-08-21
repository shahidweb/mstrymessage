import { MessageModel } from "@/model/Message";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean;
  messages?: Array<MessageModel>;
}
