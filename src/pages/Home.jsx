import React, { useState, useEffect } from "react";
import { getToken } from "../service/auth-verify";
import { useSelector, useDispatch } from "react-redux";
import { getService, getBanner } from "../store/UserSlice";
import axios from "axios";
const api = "https://take-home-test-api.nutech-integrasi.app";

const Home = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.user.service);
  const banners = useSelector((state) => state.user.banner);

  useEffect(() => {
    dispatch(getBanner());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  return (
    <section>
      {/* Daftar Layanan */}
      <div className="flex">
        {services.map((item) => {
          return (
            <div
              className="flex items-center justify-between w-full p-4 my-4 bg-white rounded-xl"
              key={item.service_name}
            >
              <div className="flex flex-col items-center gap-5 text-center">
                <img src={item.service_icon} alt="" />
                <div>
                  <p className="text-sm">{item.service_name}</p>
                  <p className="text-xs">{item.service_description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Banner */}
      <div className="mt-8">
        <p className="mb-4">temukan promo menarik</p>
        <div className="flex items-center gap-4">
          {banners.map((item) => {
            return (
              <div
                className="flex items-center justify-center w-full "
                key={item.banner_name}
              >
                <img src={item.banner_image} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
