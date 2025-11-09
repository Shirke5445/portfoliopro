require("dotenv").config();
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const contactValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("message")
    .trim()
    .notEmpty()
    .isLength({ max: 2000 })
    .withMessage("Message is required and must be less than 2000 characters"),
];

router.post("/contact", contactValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ Validation errors:", errors.array());
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  const { name, email, message } = req.body;

  // Log the contact request (you'll see this in Render logs)
  console.log("📧 Contact form received:", {
    name,
    email,
    message: message.substring(0, 100) + (message.length > 100 ? "..." : ""),
    timestamp: new Date().toISOString(),
  });

  try {
    // Since we're using EmailJS in frontend, just return success
    // This keeps your API structure intact for other potential uses
    console.log(
      "✅ Contact form processed successfully (Email handled by frontend)"
    );

    res.json({
      success: true,
      message: "Message received successfully! I'll get back to you soon.",
    });
  } catch (error) {
    console.error("❌ Unexpected error in contact route:", error);
    res.status(500).json({
      success: false,
      message: "Server error processing your request",
    });
  }
});

// Add a test route to verify backend is working
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Contact API is working!",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
