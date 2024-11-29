const { ValidationError } = require('../utils/errors');

const validate = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const message = error.details.map(detail => detail.message).join(', ');
      throw new ValidationError(message);
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validate;