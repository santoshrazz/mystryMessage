import * as React from "react";

interface EmailTemplateProps {
  email: string;
  username: string;
  verificationCode: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  username,
  verificationCode,
}) => (
  <div>
    <h1>Welcome, {username}!</h1>
    <p>You Have requested to verify your {email} email</p>
    <p>and {verificationCode} is your code to verify your email</p>
  </div>
);
