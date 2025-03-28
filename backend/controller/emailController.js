import nodemailer from "nodemailer";
import dotenv from "dotenv";

import { sessionEmailContent } from "../utils/sessionEmailContent.js"; // Assuming you have this
import { Expert } from "../models/Experts.js";

dotenv.config();

// Email sending function
export const sendTestimonialEmail = async (req, res) => {
  try {
    // Extract data from request body
    console.log(req.body);
    const { sessionId, email, name, date } = req.body;

    console.log("date", date);

    const expert = await Expert.findOne({ id: 101 });

    // console.log("expert", expert.booked_dates);

    // expert.booked_dates.filter(
    //   (dating) => dating.timestamp.toISOString() === date
    // )[0].testimonial_sent = true;

    console.log(typeof date);

    // expert.booked_dates
    //   .map((dating) => dating.toObject())
    //   .filter((dating) => {
    //     const timestampISOString = new Date(dating.timestamp).toISOString();
    //     return timestampISOString === date;
    //   })[0].testimonial_sent = true;

    // console.log("expertw", expert.booked_dates);

    // await expert.save();

    const matchingDate = expert.booked_dates
      .map((dating) => dating._doc || dating)
      .find((dating) => {
        const timestampISOString = new Date(dating.timestamp).toISOString();
        return timestampISOString === date;
      });

    if (matchingDate) {
      // If it's a Mongoose document
      if (matchingDate.save) {
        matchingDate.testimonial_sent = true;
        await matchingDate.save(); // Make sure to await if this is an async operation
      } else {
        // If it's a plain object
        matchingDate.testimonial_sent = true;
      }
    }

    console.log("expertw", expert.booked_dates);
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAILGOOGLE,
        pass: process.env.PASSWORDGOOGLE,
      },
    });

    // Prepare mail options
    const mailOptions = {
      from: "Off-Campus <support@off-campus.in>",
      to: email,
      subject: "Testimonial Request",
      html: sessionEmailContent(email, sessionId, name), // Modify this function as needed
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Send success response
    res.status(200).json({
      success: true,
      message: "Testimonial email sent successfully",
      sessionId: sessionId,
      responseInfo: info.response,
      testimonial_sent: true,
    });
  } catch (error) {
    console.error("Email sending error:", error);

    // Send error response
    res.status(500).json({
      success: false,
      message: "Failed to send testimonial email",
      error: error.message,
    });
  }
};

// In your routes file (e.g., emailRoutes.js)
// router.post('/send-testimonial-email', sendTestimonialEmail);

// recipients.forEach((recipient) => {
//   sendEmail(recipient, subject, text, html);
// });

// sendEmail("ashwanidey2904@gmail.com","Test Email","",emailingEmailContent("Ashwani","1234","hassdfsad"))
