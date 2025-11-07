require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");

const createTransporter = () =>
  nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

const contactValidation = [
  body("name").trim().notEmpty(),
  body("email").isEmail().normalizeEmail(),
  body("message").trim().notEmpty().isLength({ max: 2000 }),
];

router.post("/contact", contactValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });

  const { name, email, message } = req.body;
  const transporter = createTransporter();
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `New message from ${name}`,
    html: `<h3>${name} says:</h3><p>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

module.exports = router;
