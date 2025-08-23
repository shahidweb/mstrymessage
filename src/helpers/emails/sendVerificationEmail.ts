import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import { VerificationEmailTemplate } from "./VerificationTemplate";

export async function sendVerifcationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Hello world",
      react: VerificationEmailTemplate({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: "verification email send successfully",
    };
  } catch (error) {
    console.error("Error sending verification email", error);
    return {
      success: false,
      message: "Failed to send verification email here",
    };
  }
}
