import axios from "axios";
import authHeader from "./auth-header";

const api = "https://api-doc-tht.nutech-integrasi.app/";

const getProfile = async () => {
  return axios.get(api + "profile", { headers: authHeader() });
};

const updateProfile = async (firstName, lastName) => {
  return axios.put(
    api + "profile/update",
    {
      firstName,
      lastName,
    },
    { headers: authHeader() }
  );
};

const getService = () => {
  return axios.get(api + "service", { headers: authHeader() });
};

const getBalance = () => {
  return axios.get(api + "balance", { headers: authHeader() });
};

const postTopup = (amount) => {
  return axios.post(
    api + "topup",
    {
      amount,
    },
    { headers: authHeader() }
  );
};

const postTransaction = (amount, serviceId) => {
  return axios.post(
    api + "transaction",
    {
      amount,
      serviceId,
    },
    { headers: authHeader() }
  );
};

const getTransaction = (limit) => {
  return axios.get(api + "transaction/history?limit=" + limit, {
    headers: authHeader(),
  });
};

export default {
  getProfile,
  updateProfile,
  getService,
  getBalance,
  postTopup,
  postTransaction,
  getTransaction,
};
