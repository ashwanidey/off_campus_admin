export const sessionEmailContent = ({  name }) => {
 
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
        <h1>Quick Favor? Share Your Thoughts!</h1>
      </div>
      <div class="content">
        <p>Hey ${name}!</p>
        <p>
  We’d love to hear from you! If Off-Campus has helped you in any way—whether in landing an internship, acing an interview, or just boosting your confidence—could you take a minute to share your experience?
</p>
        
        <p>Just click this link: <a href="https://off-campus.in/testimonial">Testimonial Form</a> and fill out the form. Your feedback means a lot to us and helps others in their journey!</p>
</p>
        
        <p>
  It won’t take more than 2 minutes, and your words might inspire someone else to take the first step!

</p>

        <p>Thanks a ton! 
</p>
        
        <p style="text-align: right;">Cheers,<br><strong>Team Off-Campus</strong></p>
      </div>
      <div class="footer">
        <p>If you need assistance, please contact our <a href="mailto:${process.env.SUPPORT_EMAIL}">support team</a>.</p>
      </div>
    </div>
  </body>
  </html>`;
};