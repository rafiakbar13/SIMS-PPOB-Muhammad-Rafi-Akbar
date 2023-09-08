import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import Hero from "../../assets/Illustrasi Login.png";
import { LuAtSign } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import { useForm, Controller } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/UserSlice";
const Login = () => {
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    dispatch(signIn(data));
  };

  return (
    <div className="relative flex w-full h-full">
      <div className="w-1/2 h-screen ">
        <div className="flex flex-col justify-center w-2/3 h-full mx-auto xl:w-1/2">
          <div className="flex items-center justify-center gap-3">
            <img src={Logo} alt="" />
            <span className="">SIMS PPOB</span>
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-center">
            Masuk atau buat akun untuk memulai
          </h2>

          <form
            method="POST"
            className="mt-8 space-y-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-3 p-2 border-2 rounded-md">
              {/* icon */}
              <LuAtSign className="text-black" />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full outline-none h-7"
                    placeholder="masukkan email anda"
                  />
                )}
              />
            </div>

            <div className="flex items-center gap-3 p-2 border-2 rounded-md">
              {/* icon */}
              <CiLock className="text-black" />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className="w-full outline-none h-7"
                    placeholder="masukkan password anda"
                  />
                )}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white bg-red-500 rounded"
            >
              Masuk
            </button>
            <p className="mt-4 text-center">
              belum punya akun? registrasi{" "}
              <NavLink to="/register" className="text-red-500">
                di sini
              </NavLink>
            </p>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-screen ">
        <img src={Hero} className="w-full h-full" alt="Illustrasi Login" />
      </div>
    </div>
  );
};

export default Login;
