/**
 * Validation utilities for bug tracker
 */

const validateBugTitle = (title) => {
  if (!title || typeof title !== 'string') {
    return {
      isValid: false,
      error: 'Title is required and must be a string'
    };
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length === 0) {
    return {
      isValid: false,
      error: 'Title cannot be empty'
    };
  }

  if (trimmedTitle.length > 100) {
    return {
      isValid: false,
      error: 'Title cannot exceed 100 characters'
    };
  }

  return { isValid: true };
};

const validateBugDescription = (description) => {
  if (!description || typeof description !== 'string') {
    return {
      isValid: false,
      error: 'Description must be a string'
    };
  }

  if (description.length > 1000) {
    return {
      isValid: false,
      error: 'Description cannot exceed 1000 characters'
    };
  }

  return { isValid: true };
};

const validatePriority = (priority) => {
  const numPriority = parseInt(priority);

  if (isNaN(numPriority) || numPriority < 1 || numPriority > 5) {
    return {
      isValid: false,
      error: 'Priority must be between 1 and 5'
    };
  }

  return { isValid: true };
};

const validateSeverity = (severity) => {
  const validSeverities = ['low', 'medium', 'high'];

  if (!validSeverities.includes(severity)) {
    return {
      isValid: false,
      error: `Severity must be one of: ${validSeverities.join(', ')}`
    };
  }

  return { isValid: true };
};

const validateStatus = (status) => {
  const validStatuses = ['open', 'in-progress', 'closed'];

  if (!validStatuses.includes(status)) {
    return {
      isValid: false,
      error: `Status must be one of: ${validStatuses.join(', ')}`
    };
  }

  return { isValid: true };
};

const validateBugData = (data) => {
  const errors = [];

  // Validate title
  const titleValidation = validateBugTitle(data.title);
  if (!titleValidation.isValid) errors.push(titleValidation.error);

  // Validate description if provided
  if (data.description) {
    const descValidation = validateBugDescription(data.description);
    if (!descValidation.isValid) errors.push(descValidation.error);
  }

  // Validate priority if provided
  if (data.priority) {
    const priorityValidation = validatePriority(data.priority);
    if (!priorityValidation.isValid) errors.push(priorityValidation.error);
  }

  // Validate severity if provided
  if (data.severity) {
    const severityValidation = validateSeverity(data.severity);
    if (!severityValidation.isValid) errors.push(severityValidation.error);
  }

  // Validate status if provided
  if (data.status) {
    const statusValidation = validateStatus(data.status);
    if (!statusValidation.isValid) errors.push(statusValidation.error);
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors
    };
  }

  return { isValid: true };
};

module.exports = {
  validateBugTitle,
  validateBugDescription,
  validatePriority,
  validateSeverity,
  validateStatus,
  validateBugData
};