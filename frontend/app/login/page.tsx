"use client";
import { useFormik } from "formik";
import LoginSchema from "@/schema/LoginSchema";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/slice/UserSlice";
import { RootState, AppDispatch } from "@/redux/store";
export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading, user } = useSelector(
    (state: RootState) => state.user
  );
  const {
    touched,
    handleSubmit,
    getFieldProps,
    errors,
    isValid,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const userInfos = {
        email: values.email,
        password: values.password,
      };

      try {
        const infos = await dispatch(registerUser(userInfos));

        console.log("infos", infos);
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: LoginSchema,
  });

  console.log(user);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center ">
      <h1 className="text-xl py-3">ورود</h1>
      <form
        onSubmit={handleSubmit}
        className="w-[350px] h-max bg-blue-200 border border-blue-300 p-3 rounded-lg"
      >
        <input
          {...getFieldProps("email")}
          placeholder="ایمیل ..."
          className="w-full h-12 bg-white mb-2 rounded-lg outline-none px-2"
          type="email"
          name="email"
        />
        {touched.email && <p className="text-red-400 mb-2">{errors.email}</p>}
        <input
          {...getFieldProps("password")}
          placeholder="رمز عبور ..."
          className="w-full h-12 bg-white mb-2 rounded-lg outline-none px-2"
          type="password"
          name="password"
        />
        {touched.password && (
          <p className="text-red-400 mb-2">{errors.password}</p>
        )}
        <button
          disabled={!isValid || isSubmitting}
          type="submit"
          className="w-full h-12 bg-green-400 rounded-lg "
        >
          {loading ? "در حال بارگیری" : "تایید"}
        </button>
        {error && <div>{error}</div>}
      </form>
    </main>
  );
}
