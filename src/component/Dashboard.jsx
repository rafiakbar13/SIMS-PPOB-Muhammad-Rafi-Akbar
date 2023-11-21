import React, { useState, useEffect } from "react";
import { getBalance, getProfile } from "../store/UserSlice";
import Avatar from "../assets/Profile Photo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFillCircleFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.user.balance);
  const firstName = useSelector((state) => state.user.first_Name);
  const lastName = useSelector((state) => state.user.last_Name);
  const profileImage = useSelector((state) => state.user.profile_image);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch, balance]);

  const handleShowBalance = () => {
    setShow(!show);
  };

  return (
    <section>
      <div className="flex items-center justify-between mt-8">
        <div className="flex flex-col w-full">
          <img
            src={profileImage === null ? Avatar : profileImage}
            alt=""
            width={70}
          />
          <p className="mt-4 text-sm">Selamat Datang</p>
          <h2 className="text-xl font-semibold">
            {firstName} {lastName}
          </h2>
        </div>
        <div className="w-full h-full">
          <div className="w-full h-full p-6 bg-no-repeat bg-contain bg-saldo">
            <p className="text-white ">Saldo anda</p>
            {show ? (
              <p className="py-3 text-lg text-white">Rp {balance}</p>
            ) : (
              <p className="py-3 text-white">
                Rp
                {Array(6)
                  .fill()
                  .map((_, i) => (
                    <BsFillCircleFill
                      key={i}
                      className="inline-block mx-1 space-x-2 text-[8px]"
                    />
                  ))}
              </p>
            )}
            <button
              onClick={handleShowBalance}
              className="flex items-center gap-2 text-sm text-white"
            >
              {show ? (
                <p className="text-sm text-white">Tutup saldo</p>
              ) : (
                <p className="text-sm text-white">Lihat saldo</p>
              )}
              {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
