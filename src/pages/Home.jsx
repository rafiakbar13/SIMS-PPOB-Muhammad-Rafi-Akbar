import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getService, getBanner } from "../store/UserSlice";
import { Link } from "react-router-dom";

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
          const id = item.service_code;
          return (
            <div
              className="flex items-center justify-between w-full p-4 my-4 bg-white rounded-xl"
              key={item.service_code}
            >
              <Link to={`pembayaran/${id}`}>
                <div className="flex flex-col items-center gap-5 text-center">
                  <img src={item.service_icon} alt="" className="w-10 h-10" />
                  <div>
                    <p className="text-sm">{item.service_name}</p>
                    <p className="text-xs">{item.service_description}</p>
                  </div>
                </div>
              </Link>
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
