import * as React from "react";

interface EmailTemplateProps {
  email: string;
  username: string;
  veificationCode: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  username,
  veificationCode,
}) => (
  <div>
    <h1>Welcome, {username}!</h1>
    <p>You Have requested to verify your {email} email</p>
    <p>and {veificationCode} is your code to verify your email</p>
  </div>
);
