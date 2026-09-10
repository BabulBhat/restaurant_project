import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const getallCategory = createAsyncThunk(
  "allcategory",
  async (userdata, thunkApi) => {
    // console.log(userdata);  
    try {
      const res = await fetch(`${baseUrl}/api/frontend/allcategory`, {
        method: "GET",
        headers: {
          userdata: JSON.stringify(userdata),
        },
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

const allcategorySlice = createSlice({
  name: "allcategory",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallCategory.pending, (state) => {
        state.loading = true;
        state.data = [];
      })
      .addCase(getallCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getallCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = allcategorySlice.actions;
export default allcategorySlice.reducer;
