import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/payments";

export const markPayment = createAsyncThunk(
  "payments/mark",
  async ({ customerId, status }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/mock/${customerId}`, { status });
      return { customerId, status: res.data.status };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchPaymentStatus = createAsyncThunk(
  "payments/fetchStatus",
  async (customerId, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/status/${customerId}`);
      return { customerId, status: res.data.status };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    statusMap: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(markPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.statusMap[action.payload.customerId] = action.payload.status;
      })
      .addCase(markPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPaymentStatus.fulfilled, (state, action) => {
        state.statusMap[action.payload.customerId] = action.payload.status;
      });
  },
});

export default paymentSlice.reducer;
