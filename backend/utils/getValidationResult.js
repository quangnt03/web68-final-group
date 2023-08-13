const { validationResult } = require("express-validator");
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const errorMsg = errors.array();
  for (const error of errorMsg) {
    delete error["location"];
    delete error["type"];
  }

  return res.status(400).json({ success: false, errors: errorMsg });
};
