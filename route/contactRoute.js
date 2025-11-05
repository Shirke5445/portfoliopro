require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // App password, NOT regular password
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production", // Strict in production
    },
  });
};

// Email template
const createEmailTemplate = (data) => ({
  from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
  to: process.env.GMAIL_USER,
  replyTo: data.email,
  subject: `New message from ${data.name}`,
  text: `
    Name: ${data.name}
    Email: ${data.email}
    Message: ${data.message}
  `,
  html: `
    <h3>New Contact Form Submission</h3>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  `,
});

// Validation rules
const contactValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  body("message")
    .trim()
    .notEmpty()
    .isLength({ max: 2000 })
    .withMessage("Message must be less than 2000 characters"),
];

// Route handler
router.post("/contact", contactValidation, async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, message } = req.body;
    const transporter = createTransporter();
    const mailOptions = createEmailTemplate({ name, email, message });

    // Verify connection in production
    if (process.env.NODE_ENV === "production") {
      await transporter.verify();
      console.log("SMTP connection verified");
    }

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);

    res.status(200).json({
      success: true,
      message: "Thank you for your message! I will respond soon.",
    });
  } catch (error) {
    console.error("Email send error:", error);

    let statusCode = 500;
    let errorMessage = "Failed to send message";
    let errorDetails = null;

    if (error.code === "EAUTH") {
      statusCode = 401;
      errorMessage = "Email configuration error";
      errorDetails =
        process.env.NODE_ENV === "development"
          ? "Invalid SMTP credentials"
          : undefined;
    } else if (error.code === "EENVELOPE") {
      statusCode = 400;
      errorMessage = "Invalid email address";
    }

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error:
        errorDetails ||
        (process.env.NODE_ENV === "development" ? error.message : undefined),
    });
  }
});

module.exports = router;
