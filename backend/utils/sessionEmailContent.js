export const sessionEmailContent = ({ email, sessionId, name }) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        color: #333;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
      }
      .header {
        text-align: center;
        background: linear-gradient(to right, #0000ff, #800080);
        color: #ffffff;
        padding: 10px;
        border-radius: 8px 8px 0 0;
      }
      .content {
        padding: 20px;
      }
      .content h1 {
        font-size: 24px;
        color: #4caf50;
      }
      .content p {
        line-height: 1.6;
        font-size: 16px;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 14px;
        color: #777;
      }
      .footer a {
        color: #4caf50;
        text-decoration: none;
      }
      .bonus-section {
        background: #f5f5f5;
        padding: 15px;
        border-radius: 5px;
        margin: 15px 0;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Welcome to the Consulting Fellowship! You're In!</h1>
      </div>
      <div class="content">
        <p>Hey ${name}!</p>
        <p>
  Congrats on securing your spot in the Consulting Fellowship!  We're excited to have you with us on this journey to consulting greatness.</p>
        
        <p>Next Steps? We're adding you to the exclusive WhatsApp group, where all the magic (and occasional memes) will happen. Expect a message from us soon!</p>
        
        <p>
  Get ready to crack those case studies, sharpen your skills, and become a consulting superstar. And remember, you’re not just learning, you’re leveling up!</p>
        
        <p style="text-align: right;">Cheers,<br><strong>Team Off-Campus</strong></p>
      </div>
      <div class="footer">
        <p>If you need assistance, please contact our <a href="mailto:${process.env.SUPPORT_EMAIL}">support team</a>.</p>
      </div>
    </div>
  </body>
  </html>`;
};
