import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/Navbar";
import { LuAtSign } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { BiSolidPencil } from "react-icons/bi";
import { getToken } from "../service/auth-verify";
import AvatarImg from "../assets/Profile Photo.png";
import {
  updateProfile,
  getProfile,
  updateProfileImage,
} from "../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const Akun = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.user.first_Name);
  const lastName = useSelector((state) => state.user.last_Name);
  const email = useSelector((state) => state.user.email);
  const profileImage = useSelector((state) => state.user.profile_image);

  const onSubmit = (data) => {
    dispatch(updateProfile(data));
    dispatch(updateProfileImage(avatar));
  };

  const handleAvatar = (e) => {
    console.log(e.target.files[0]);
    const selectedFile = e.target.files[0];
    setAvatar(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarPreview(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const Logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <section className="px-24 mx-auto max-w-7xl">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Image */}

        {/* Form */}
        <div className="flex flex-col w-1/2 gap-8 mt-3">
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="avatar" className="relative cursor-pointer">
                <img
                  src={profileImage ? profileImage : AvatarImg}
                  alt=""
                  width={100}
                />
                <Controller
                  name="profile_image"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="file"
                      id="avatar"
                      className="w-full outline-none h-7"
                      placeholder="masukkan email anda"
                      accept="image/jpeg, image/png"
                      hidden
                      onChange={handleAvatar}
                    />
                  )}
                />
                <div className="absolute p-1 text-sm transform translate-x-20 -translate-y-6 bg-white border border-gray-400 rounded-full">
                  <BiSolidPencil className="text-xs" />
                </div>
              </label>
              <h2 className="mt-4 text-2xl font-semibold">
                {firstName} {lastName}
              </h2>
            </div>
            <label htmlFor="email">Email</label>
            <div className="flex items-center gap-3 px-3 py-2 border-2 rounded-md">
              {/* icon */}
              <LuAtSign className="text-black" />
              <Controller
                name="email"
                control={control}
                defaultValue={email}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="email"
                    className="w-full outline-none h-7"
                    placeholder="masukkan email anda"
                  />
                )}
              />
            </div>
            <label htmlFor="firstName">Nama Depan</label>
            <div className="flex items-center gap-3 p-2 border-2 rounded-md">
              {/* icon */}
              <IoPersonOutline className="text-black" />
              <Controller
                name="first_name"
                control={control}
                defaultValue={firstName}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="firstName"
                    className="w-full outline-none h-7"
                    placeholder="nama depan"
                  />
                )}
              />
            </div>
            <label htmlFor="lastName">Nama Belakang</label>
            <div className="flex items-center gap-3 p-2 border-2 rounded-md">
              {/* icon */}
              <IoPersonOutline className="text-black" />
              <Controller
                name="last_name"
                control={control}
                defaultValue={lastName}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="lastName"
                    className="w-full outline-none h-7"
                    placeholder="nama belakang"
                  />
                )}
              />
            </div>

            <button className="w-full py-3 font-semibold text-red-500 bg-white border border-red-500 rounded">
              Edit Profil
            </button>
            <button
              className="w-full py-3 mt-2 text-white bg-red-500 rounded"
              onClick={Logout}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Akun;
