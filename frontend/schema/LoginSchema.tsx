import * as Yup from "yup";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("ایمیل معتبر وارد کنید")
    .required("ایمیل را وارد کنید"),
  password: Yup.string()
    .min(4, "حداقل ۴ کاراکتر")
    .required("رمز عبور را وارد کنید"),
});

export default LoginSchema;
