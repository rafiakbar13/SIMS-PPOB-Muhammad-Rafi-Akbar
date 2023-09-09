import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../../assets/Logo.png";
import Hero from "../../assets/Illustrasi Login.png";
import { LuAtSign } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../store/UserSlice";
import Swal from "sweetalert2";
const Register = () => {
  const [email, setEmail] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    if (data.password !== data.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password tidak sama",
      });
    }
    dispatch(signUp(data));
  };
  return (
    <section className="flex justify-center">
      {/* Kiri */}
      <div className="w-1/2 h-screen">
        <div className="flex flex-col justify-center w-2/3 h-full mx-auto xl:w-1/2">
          <div className="flex items-center justify-center gap-3">
            <img src={Logo} alt="" />
            <span className="">SIMS PPOB</span>
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-center">
            Lengkapi data untuk membuat akun
          </h2>

          <form className="mt-5 space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-3 p-2 border-2 rounded-md">
              {/* icon */}
              <LuAtSign className={email ? "text-black" : "text-gray-400"} />
              <input
                type="text"
                className="w-full outline-none h-7"
                placeholder="masukkan email anda"
                onChange={(e) => setEmail(e.target.value)}
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>
            {errors.email && (
              <span className="text-right text-red-500">Email tidak valid</span>
            )}

            <div className="flex items-center gap-3 p-2 border-2 rounded-md">
              {/* icon */}
              <IoPersonOutline
                className={first_name ? "text-black" : "text-gray-400"}
              />
              <input
                type="text"
                className="w-full outline-none h-7"
                placeholder="nama depan"
                onChange={(e) => setFirstname(e.target.value)}
                {...register("first_name", { required: true })}
              />
            </div>
            {errors.first_name && (
              <span className="text-red-500">
                Nama depan tidak boleh kosong
              </span>
            )}

            <div className="flex items-center gap-3 p-2 border-2 rounded-md">
              {/* icon */}
              <IoPersonOutline
                className={last_name ? "text-black" : "text-gray-400"}
              />
              <input
                type="text"
                className="w-full outline-none h-7"
                placeholder="nama belakang"
                onChange={(e) => setLastname(e.target.value)}
                {...register("last_name", { required: true })}
              />
            </div>
            {errors.last_name && (
              <span className="text-red-500">
                Nama belakang tidak boleh kosong
              </span>
            )}

            <div className="flex items-center gap-3 p-2 border-2 rounded-md">
              {/* icon */}
              <CiLock className={password ? "text-black" : "text-gray-400"} />
              <input
                type="password"
                className="w-full outline-none h-7"
                placeholder="buat password"
                onChange={(e) => setPassword(e.target.value)}
                {...register("password", {
                  required: true,
                  minLength: 8,
                })}
              />
            </div>
            {errors.password && (
              <span className="text-red-500">
                Password harus terdiri dari 8 karakter
              </span>
            )}

            <div className="flex items-center gap-3 p-2 border-2 rounded-md">
              {/* icon */}
              <CiLock
                className={confirmPassword ? "text-black" : "text-gray-400"}
              />
              <input
                type="password"
                className="w-full outline-none h-7"
                placeholder="konfirmasi password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                {...register("confirmPassword", {
                  required: true,
                  minLength: 8,
                })}
              />
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500">
                Password harus terdiri dari 8 karakter
              </span>
            )}

            <button
              type="submit"
              className="w-full py-3 text-white bg-red-500 rounded"
            >
              Registrasi
            </button>
            <p className="mt-4 text-center">
              sudah punya akun? login{" "}
              <NavLink to="/" className="text-red-500">
                di sini
              </NavLink>
            </p>
          </form>
        </div>
      </div>

      {/* Kanan */}
      <div className="w-1/2 h-screen ">
        <img src={Hero} alt="" className="w-full h-full" />
      </div>
    </section>
  );
};

export default Register;
