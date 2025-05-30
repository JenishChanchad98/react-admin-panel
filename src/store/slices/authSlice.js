import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.config";

// Async thunks
export const userLogin = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred during login" }
      );
    }
  }
);

export const userRegister = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", payload, {
        showToast: false,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred during signup" }
      );
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Actions
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
      })

      // Register actions
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
