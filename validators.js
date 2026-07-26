/**
 * Validates user input for creation and update operations
 * @param {Object} body - Request body containing user data
 * @returns {Array} Array of error messages (empty if valid)
 */
const validateUserInput = (body) => {
  const errors = [];

  // Name validation
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  } else if (body.name.trim().length < 2 || body.name.trim().length > 50) {
    errors.push('Name must be between 2 and 50 characters');
  }

  // Email validation
  if (!body.email || typeof body.email !== 'string' || body.email.trim().length === 0) {
    errors.push('Email is required and must be a non-empty string');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email.trim())) {
      errors.push('Email must be a valid email address');
    }
  }

  // Age validation (optional)
  if (body.age !== undefined && body.age !== null && body.age !== '') {
    const age = Number(body.age);
    if (isNaN(age) || !Number.isInteger(age) || age < 0 || age > 150) {
      errors.push('Age must be a valid integer between 0 and 150');
    }
  }

  // Role validation (optional)
  if (body.role) {
    const validRoles = ['user', 'admin', 'moderator'];
    if (!validRoles.includes(body.role.toLowerCase())) {
      errors.push(`Role must be one of: ${validRoles.join(', ')}`);
    }
  }

  return errors;
};

module.exports = {
  validateUserInput
};

