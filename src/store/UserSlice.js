import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
const api = import.meta.env.VITE_API_URL;
import { setTokenWithExpiration, getToken } from "../service/auth-verify";

export const signUp = createAsyncThunk(
  "registration",
  async ({ email, password, first_name, last_name }, thunkAPI) => {
    try {
      const response = await axios.post(`${api}/registration`, {
        first_name,
        last_name,
        email,
        password,
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Register Success",
          text: "Please Login",
        });
        window.location.href = "/login";
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Register Failed",
          text: error.response.data.message,
        });
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signIn = createAsyncThunk(
  "login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${api}/login`, {
        email,
        password,
      });
      setTokenWithExpiration(response.data.data.token, 12);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "Welcome",
        });
        window.location.href = "/dashboard";
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response.data.message,
        });
      } else if (error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response.data.message,
        });
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getBanner = createAsyncThunk("getBanner", async (_, thunkAPI) => {
  try {
    const token = getToken();
    if (!token) {
      return thunkAPI.rejectWithValue(response.data);
    }
    const response = await axios.get(`${api}/banner`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.data);
    }
  } catch (error) {
    if (error.response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "",
        text: error.response.data.message,
      });
    }
  }
});

export const getService = createAsyncThunk(
  "getService",
  async (_, thunkAPI) => {
    try {
      const token = getToken();
      if (!token) {
        return thunkAPI.rejectWithValue(response.data);
      }
      const response = await axios.get(`${api}/services`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response.data.message,
        });
      }
    }
  }
);

export const postTopup = createAsyncThunk(
  "postTopup",
  async (top_up_amount, thunkAPI) => {
    try {
      const token = getToken();
      if (!token) {
        return thunkAPI.rejectWithValue("Token is missing");
      }

      if (isNaN(top_up_amount) || top_up_amount < 0) {
        return thunkAPI.rejectWithValue("Invalid amount");
      }

      const response = await axios.post(
        `${api}/topup`,
        { top_up_amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: response.data.message,
        });
        return response.data.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response.data.message,
        });
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getBalance = createAsyncThunk(
  "getBalance",
  async (_, thunkAPI) => {
    try {
      const token = getToken();
      if (!token) {
        return thunkAPI.rejectWithValue(response.data);
      }
      const response = await axios.get(`${api}/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data.data.balance;
      } else {
        return thunkAPI.rejectWithValue(response.data.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response.data.message,
        });
      }
    }
  }
);

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async ({ email, first_name, last_name }, thunkAPI) => {
    try {
      const token = getToken();
      if (!token) {
        return thunkAPI.rejectWithValue(response.data);
      }
      const response = await axios.put(
        `${api}/profile/update`,
        {
          email,
          first_name,
          last_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Update Success",
          text: response.data.message,
        });
        return response.data.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response.data.message,
        });
      }
    }
  }
);

export const getProfile = createAsyncThunk(
  "getProfile",
  async (_, thunkAPI) => {
    try {
      const token = getToken();
      if (!token) {
        return thunkAPI.rejectWithValue(response.data);
      }
      const response = await axios.get(`${api}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response.data.message,
        });
      }
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "updateProfileImage",
  async (file, thunkAPI) => {
    try {
      const token = getToken();
      if (!token) {
        return thunkAPI.rejectWithValue(response.data);
      }
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.put(`${api}/profile/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Update Success",
          text: response.data.message,
        });
        return response.data.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "",
          text: error.response.data.message,
        });
      }
    }
  }
);

export const getTransactionHistory = createAsyncThunk(
  "transactionHistory",
  async ({ offset, limit }, thunkAPI) => {
    try {
      const token = getToken();
      if (!token) {
        return thunkAPI.rejectWithValue(response.data);
      }
      const response = await axios.get(`${api}/transaction/history`, {
        params: {
          offset,
          limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "",
          text: error.response.data.message,
        });
      }
    }
  }
);

export const postTransaction = createAsyncThunk(
  "transaction",
  async ({ service_code }, thunkAPI) => {
    try {
      const token = getToken();
      if (!token) {
        return thunkAPI.rejectWithValue(response.data.message);
      }
      const response = await axios.post(
        `${api}/transaction`,
        {
          service_code,
          transaction_type: "PAYMENT",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Transaction Success",
          text: response.data.message,
        });
        return response.data.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "",
          text: error.response.data.message,
        });
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    first_Name: "",
    last_Name: "",
    password: "",
    profile_image: "",
    offset: 0,
    limit: 0,
    balance: 0,
    banner: [],
    service: [],
    transaction: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
      state.email = action.payload.email;
      state.password = action.payload.password;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
      state.email = action.payload.email;
      state.password = action.payload.password;
    });
    builder.addCase(getBanner.fulfilled, (state, action) => {
      state.banner = action.payload;
    });
    builder.addCase(getService.fulfilled, (state, action) => {
      state.service = action.payload;
    });
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
    });
    builder.addCase(postTopup.fulfilled, (state, action) => {
      state.balance = action.payload.balance;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.first_Name = action.payload.first_name;
      state.last_Name = action.payload.last_name;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.first_Name = action.payload.first_name;
      state.last_Name = action.payload.last_name;
      state.profile_image = action.payload.profile_image;
    });
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
      state.profile_image = action.payload.profile_image;
    });
    builder.addCase(getTransactionHistory.fulfilled, (state, action) => {
      state.offset = action.payload.offset;
      state.limit = action.payload.limit;
      state.transaction = action.payload.records;
    });
    builder.addCase(postTransaction.fulfilled, (state, action) => {
      state.balance = action.payload.balance;
    });
  },
});
export const userSelector = (state) => state.user;
