import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.config";

export const fetchProfile = createAsyncThunk(
  "userProfile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/profile");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch profile" }
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "userProfile/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.put("/user/profile", profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update profile" }
      );
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    clearProfileSuccess: (state) => {
      state.success = false;
    },
    resetProfileState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
        state.success = false;
      });
  },
});

export const { clearProfileError, clearProfileSuccess, resetProfileState } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;
