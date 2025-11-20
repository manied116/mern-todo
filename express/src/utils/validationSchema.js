export const createProductValidationSchema = {
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
