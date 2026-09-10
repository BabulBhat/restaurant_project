import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
// Get Food
export const getFood = createAsyncThunk("getfood", async (userdata, thunkApi) => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/food?page=${userdata.page}&limit=5`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `${userdata.fetchToken}`,
      },
    });
    const result = await res.json();
    if (result.error) {
      return thunkApi.rejectWithValue(error.message);
    }
    return result;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

// Add Food
export const addFoodApi = createAsyncThunk(
  "addfood",
  async (userdata, thunkApi) => {
    try {
      const res = await fetch(`${baseUrl}/api/admin/food`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `${userdata.tokenresto}`,
        },
        body: JSON.stringify(userdata),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

// Edit Food
export const editFoodServer = createAsyncThunk(
  "editfood",
  async (userid, thunkApi) => {
    try {
      const res = await fetch(`${baseUrl}/api/admin/food/${userid}`, {
        method: "GET",
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

// Update Food
export const updateFood = createAsyncThunk(
  "updateFood",
  async (userdata, thunkApi) => {
    try {
      const res = await fetch(`${baseUrl}/api/admin/food/${userdata.editid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

// Delete Food
export const delFood = createAsyncThunk("delfood", async (userid, thunkApi) => {
  const confirmDelete = confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;
  try {
    const res = await fetch(`${baseUrl}/api/admin/food/${userid}`, {
      method: "DELETE",
    });
    const result = await res.json();
    return result.del_id;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

const foodSlice = createSlice({
  name: "food",
  initialState: {
    data: [],
    category_data: null,
    singleItem: null,
    page : 1,
    totalpage : 1,
    message: null,
    loading: false,
    error: false,
  },
  reducers: {
    setFoodPage : (state,action) => {
      state.page = action.payload;
      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFoodApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFoodApi.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;        
        state.data.unshift(action.payload.result);
      })
      .addCase(addFoodApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getFood.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFood.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.payload.page;
        state.data = action.payload.paginationresult;
        state.totalpage = action.payload.totalpage;
        state.category_data = action.payload.categorys_id;
      })
      .addCase(getFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit Data
      .addCase(editFoodServer.pending, (state) => {
        state.loading = true;
      })
      .addCase(editFoodServer.fulfilled, (state, action) => {
        state.loading = false;
        state.singleItem = action.payload;
      })
      .addCase(editFoodServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Data
      .addCase(updateFood.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFood.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((food) =>
          food._id === action.payload._id ? action.payload : food
        );
        
      })
      .addCase(updateFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(delFood.pending, (state) => {
        state.loading = true;
      })
      .addCase(delFood.fulfilled, (state, action) => {
        state.loading = false;        
        state.data = state.data.filter(
          (item) => item._id !== action.payload,
        );
      })
      .addCase(delFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setFoodPage } = foodSlice.actions;
export default foodSlice.reducer;
