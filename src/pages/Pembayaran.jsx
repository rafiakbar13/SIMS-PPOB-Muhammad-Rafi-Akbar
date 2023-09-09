import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { getService } from "../store/UserSlice";
import { useParams } from "react-router-dom";
import { CiWallet } from "react-icons/ci";
import { postTransaction } from "../store/UserSlice";

const Pembayaran = () => {
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();
  const { id } = useParams();
  const services = useSelector((state) => state.user.service);
  const balance = useSelector((state) => state.user.balance);
  const filter = services.filter((item) => item.service_code === id);
  const serviceId = filter.length > 0 ? filter[0] : null;
  const serviceTarif = serviceId ? serviceId.service_tariff : null;
  const onSubmit = (data) => {
    if (balance >= serviceTarif) {
      dispatch(postTransaction({ service_code: serviceId.service_code }));
    } else {
      console.log(false);
    }

    console.log({ service_code: serviceId.service_code });
  };

  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  return (
    <section className="mt-8">
      <h3>Pembayaran</h3>
      {serviceId ? (
        <div className="flex items-center gap-3 mt-4">
          <img src={serviceId.service_icon} alt="" className="w-10 h-10" />
          <p className="font-semibold">{serviceId.service_name}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className="mt-8 ">
        <form action="post" className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-3 p-2 mb-4 border-2 rounded-md">
            <CiWallet className="text-black" />
            <Controller
              name="service_code"
              control={control}
              defaultValue={serviceTarif}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="service_code"
                  className="w-full outline-none h-7"
                  placeholder="masukkan nominal yang ingin dibayar"
                />
              )}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-red-500 rounded"
          >
            Bayar
          </button>
        </form>
      </div>
    </section>
  );
};

export default Pembayaran;
