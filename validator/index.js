exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Enter a valid email address")
    .isLength({
      min: 4,
      max: 32,
    });
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/)
    .withMessage(
      "Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
    );

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

// exports.forgotPasswordValidator = (req, res, next) => {
//   req
//     .check("email")
//     .not()
//     .isEmpty()
//     .isEmail()
//     .withMessage("Must be a valid email address");
//   const errors = req.validationErrors();
//   if (errors) {
//     const firstError = errors.map((error) => error.msg)[0];
//     return res.status(400).json({ error: firstError });
//   }
//   next();
// };

// exports.resetPasswordValidator = (req, res, next) => {
//   req
//     .check("newPassword")
//     .not()
//     .isEmpty()
//     .matches(
//       "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
//     )
//     .withMessage(
//       "Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
//     );
//   const errors = req.validationErrors();
//   if (errors) {
//     const firstError = errors.map((error) => error.msg)[0];
//     return res.status(400).json({ error: firstError });
//   }
//   next();
// };
