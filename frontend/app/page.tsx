"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { getCurrentUser, logoutUser } from "@/redux/slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

export default function page() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  const { user } = useSelector((state: RootState) => state.user);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  console.log(user);

  return (
    <div className="flex flex-col gap-y-3 items-center justify-center w-full h-screen ">
      { user?.email && <p>ایمیل شما : {user?.email}</p>}
      <Link
        href="/register"
        className="w-44 h-12 bg-blue-400 text-xl rounded-lg flex items-center justify-center"
      >
        ثبت‌نام
      </Link>
      <Link
        href="/login"
        className="w-44 h-12 bg-blue-400 text-xl rounded-lg flex items-center justify-center"
      >
        ورود
      </Link>

      {user && (
        <button
          onClick={logoutHandler}
          className="w-44 h-12 bg-blue-400 text-xl rounded-lg flex items-center justify-center"
        >
          خروج
        </button>
      )}
    </div>
  );
}
