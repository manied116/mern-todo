const createProductValidationSchema = {
  p_name: {
    notEmpty: {
      errorMessage: "Product name must not be empty",
    },
    isLength: {
      options: { min: 3, max: 15 },
      errorMessage: "Product name length requirements not met",
    },
  },

  p_price: {
    notEmpty: {
      errorMessage: "Product price must not be empty",
    },
    isFloat: {
      options: { min: 25, max: 100 }, // your required numbers
      errorMessage: "Price must be between 25 and 100",
    },
  },
};

const createUserValidationSchema = {
  // name: {
  //   notEmpty: {
  //     errorMessage: "Name must not be empty",
  //   },
  //   isLength: {
  //     options: { min: 3, max: 30 },
  //     errorMessage: "Name length requirements not met",
  //   },
  // },
  // email: {
  //   notEmpty: {
  //     errorMessage: "Email must not be empty",
  //   },
  //   isEmail: {
  //     errorMessage: "Must be a valid email",
  //   },
  // },
  // age: {
  //   optional: true,
  //   isInt: {
  //     options: { min: 1, max: 120 },
  //     errorMessage: "Age must be a valid integer between 1 and 120",
  //   },
  // },
  username: {
    notEmpty: {
      errorMessage: "Username must not be empty",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
    isLength: {
      options: { min: 3, max: 30 },
      errorMessage: "Username length requirements not met",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password must not be empty",
    },
    isLength: {
      options: { min: 6, max: 120 },
      errorMessage: "Password length requirements not met",
    },
  },
};

module.exports = {
  createProductValidationSchema,
  createUserValidationSchema,
}