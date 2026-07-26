const mongoose = require("mongoose");
const { validateUserInput } = require("../utils/validators");

// Validate user input
const validateUser = (req, res, next) => {
  const errors = validateUserInput(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
      message: "Validation failed",
    });
  }

  next();
};

// Validate MongoDB ObjectId
const validateUserId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid user ID",
    });
  }

  next();
};

// Sanitize input
const sanitizeUserInput = (req, res, next) => {
  if (req.body.name) {
    req.body.name = req.body.name.trim();
  }

  if (req.body.email) {
    req.body.email = req.body.email.trim().toLowerCase();
  }

  if (req.body.age) {
    req.body.age = Number(req.body.age);
  }

  next();
};

module.exports = {
  validateUser,
  validateUserId,
  sanitizeUserInput,
};