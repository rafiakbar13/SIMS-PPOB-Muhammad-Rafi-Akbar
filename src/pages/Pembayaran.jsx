import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { getService } from "../store/UserSlice";
import { useParams } from "react-router-dom";
import { CiWallet } from "react-icons/ci";
import { postTransaction } from "../store/UserSlice";
import Swal from "sweetalert2";

const Pembayaran = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const services = useSelector((state) => state.user.service);
  const balance = useSelector((state) => state.user.balance);
  const filter = services.filter((item) => item.service_code === id);
  const serviceId = filter.length > 0 ? filter[0] : null;
  const serviceTarif = serviceId ? serviceId.service_tariff : null; // Berikan nilai default jika service_tariff null
  const [topup, setTopup] = useState("");

  const onSubmit = (data) => {
    if (topup >= serviceTarif && balance >= serviceTarif) {
      dispatch(postTransaction({ service_code: serviceId.service_code }));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Saldo anda tidak mencukupi untuk melakukan pembayaran ${serviceId.service_name}, Minimal pembayaran ${serviceId.service_name} adalah Rp ${serviceTarif}`,
      });
    }
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
      <div className="mt-8">
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-3 p-2 mb-4 border-2 rounded-md">
            <CiWallet className="text-black" />
            <input
              {...register("topup", { required: true })}
              type="number"
              id="service_code"
              className="w-full outline-none h-7"
              placeholder="Masukkan nominal yang ingin dibayar"
              value={topup}
              onChange={(e) => setTopup(e.target.value)}
            />
          </div>
          {errors.topup && (
            <span className="text-sm text-red-500">Nominal harus diisi</span>
          )}
          <button
            type="submit"
            className="w-full py-3 mt-2 text-white bg-red-500 rounded"
          >
            Bayar
          </button>
        </form>
      </div>
    </section>
  );
};

export default Pembayaran;
