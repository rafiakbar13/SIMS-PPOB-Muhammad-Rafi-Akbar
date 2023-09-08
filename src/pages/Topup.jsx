import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CiWallet } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { postTopup } from "../store/UserSlice";
const Topup = () => {
  const [nominal, setNominal] = useState(0);
  const { handleSubmit, control } = useForm();
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();

  const handleNominalChange = (event) => {
    const value = event.target.value;
    setNominal(value);
    setIsDisabled(value === "" || value === "0");
  };

  const handleSetNominal = (value) => {
    setNominal(value);
    setIsDisabled(false);
  };

  const onSubmit = () => {
    dispatch(postTopup(nominal));
  };

  return (
    <section className="mt-8">
      <p className="text-sm">Silahkan Masukan</p>
      <h2 className="mb-5 text-2xl font-semibold">Nominal Topup</h2>
      <div className="flex">
        <form className="w-3/5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-3 p-2 mb-4 border-2 rounded-md">
            <CiWallet className="text-black" />
            <Controller
              name="topup"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="w-full outline-none h-7"
                  placeholder="masukkan nominal Top Up"
                  value={nominal}
                  onChange={handleNominalChange}
                />
              )}
            />
          </div>
          <button
            disabled={isDisabled}
            type="submit"
            className={
              isDisabled
                ? "w-full py-3 text-white bg-gray-400 rounded"
                : "w-full py-3 text-white bg-red-500 rounded"
            }
          >
            Top Up
          </button>
        </form>
        <div className="grid w-1/4 grid-flow-col grid-rows-2 gap-3 ml-3">
          <button
            onClick={() => handleSetNominal(10000)}
            className="w-full px-4 text-gray-400 border-2 rounded "
          >
            Rp.10.000
          </button>
          <button
            onClick={() => handleSetNominal(20000)}
            className="w-full px-4 text-gray-400 border-2 rounded "
          >
            Rp.20.000
          </button>
          <button
            onClick={() => handleSetNominal(50000)}
            className="px-4 text-gray-400 border-2 rounded "
          >
            Rp.50.000
          </button>
          <button
            onClick={() => handleSetNominal(100000)}
            className="px-4 text-gray-400 border-2 rounded "
          >
            Rp.100.000
          </button>
          <button
            onClick={() => handleSetNominal(250000)}
            className="px-4 text-gray-400 border-2 rounded "
          >
            Rp.250.0000
          </button>
          <button
            onClick={() => handleSetNominal(500000)}
            className="px-4 text-gray-400 border-2 rounded "
          >
            Rp.500.0000
          </button>
        </div>
      </div>
    </section>
  );
};

export default Topup;
