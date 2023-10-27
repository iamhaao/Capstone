import * as yup from "yup";

//login validation
const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Passwrod is required.")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
});
//register validation
const RegisterValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Passwrod is required.")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
  name: yup
    .string()
    .required("Full name is required")
    .max(30, "Fullname is mus be lessthan 30 characters")
    .matches(/^[a-zA-Z]*$/, "Name must containt only letters"),
});

const ProfileValidation = yup.object().shape({
  name: yup
    .string()
    .required("Full name is required")
    .max(30, "Fullname is mus be lessthan 30 characters")
    .matches(/^[a-zA-Z]*$/, "Name must containt only letters"),
  email: yup.string().email().required("Email is required").trim(),
});

const PasswordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .required("password required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password mus be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must containt a number"),
  newPassword: yup
    .string()
    .required("password required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password mus be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must containt a number"),
  confirmPassword: yup
    .string()
    .required("password required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password mus be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must containt a number")
    .oneOf(
      [yup.ref("newPassword"), null],
      "New Password and Confirm password must match"
    ),
});
export {
  LoginValidation,
  RegisterValidation,
  ProfileValidation,
  PasswordValidation,
};
