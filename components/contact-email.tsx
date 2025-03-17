import * as React from 'react';

interface EmailTemplateProps {
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ email }) => (
  <div>
    <h1>New Contact Form Submission</h1>
    <p>Email: {email}</p>
  </div>
);
