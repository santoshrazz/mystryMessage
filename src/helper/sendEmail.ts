import { resend } from "../lib/resend";
import { EmailTemplate } from "../../emailTemplate/Email";
import { ApiResponse } from "@/types/ApiResponse";

import ReactDOMServer from "react-dom/server"; //
export async function sendVerificationEmail(
  email: string,
  username: string,
  verificationCode: string
): Promise<ApiResponse> {
  try {
    const emailHtml = ReactDOMServer.renderToStaticMarkup(
      EmailTemplate({
        email: email,
        username: username,
        verificationCode: verificationCode, // Corrected this line
      })
    );
    resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Your Verification code is",
      html: emailHtml,
    });
    return {
      success: true,
      message: "Mail Send Successfully",
      isAcceptingMessages: true,
    };
  } catch (error: any) {
    console.error(error.message);
    return {
      success: false,
      message: "Failed to send Mail",
      isAcceptingMessages: false,
    };
  }
}
