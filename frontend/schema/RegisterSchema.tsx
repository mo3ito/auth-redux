import * as Yup from "yup";

const RegisterSchema = Yup.object({
  email: Yup.string()
    .email("ایمیل معتبر وارد کنید")
    .required("ایمیل را وارد کنید"),
  password: Yup.string()
    .min(4, "حداقل ۴ کاراکتر")
    .required("رمز عبور را وارد کنید"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "مقدار وردی با رمز عبور یکی نیست")
    .min(4, "حداقل ۴ کاراکتر")
    .required('مقدار تکرار رمز عبور را وارد کنید'),
});

export default RegisterSchema;