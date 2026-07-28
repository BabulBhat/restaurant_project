import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Get Category
export const getCategory = createAsyncThunk(
  "getcategory",
  async (userdata, thunkApi) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/category?page=${userdata.page}&limit=5`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userdata.authtoken}`,
          },
        },
      );
      const result = await res.json();
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

// Add Category
export const addcategory = createAsyncThunk(
  "addcategory",
  async (userdata, { dispatch }, thunkApi) => {
    try {
      const res = await fetch(`http://localhost:3000/api/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userdata.allcategory.tokenresto}`,
        },
        body: JSON.stringify(userdata.allcategory.category),
      });
      const result = await res.json();
      if (result) {
        const authtoken = userdata.allcategory.tokenresto;
        const page = userdata.page;
        dispatch(getCategory({ authtoken, page }));
      }
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

// Delete Category
export const delCategory = createAsyncThunk(
  "delCategory",
  async (userdata, { dispatch }, thunkApi) => {
    const confirmDelete = confirm("Are You Sure?");
    if (!confirmDelete) return rejectWithValue("Delete cancelled");
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/category/${userdata.id}`,
        {
          method: "DELETE",
        },
      );
      const result = await res.json();
      if (result) {
        const authtoken = userdata.authtoken;
        const page = userdata.page;
        dispatch(getCategory({ authtoken, page }));
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Edit Category
export const editCategory = createAsyncThunk(
  "editCategory",
  async (userdata, thunkApi) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/category/${userdata}`,
        {
          method: "GET",
        },
      );
      const result = await res.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Update Category
export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (userdata, thunkApi) => {  
    console.log(userdata);
      
    try {
      const res = await fetch(`http://localhost:3000/api/admin/category/${userdata.editid}`, {
        method: "PUT",
        body: JSON.stringify(userdata),
      });
      const result = await res.json();
      return result;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    singleItem: [],
    totalrecords: null,
    page: 1,
    totalpage: 1,
    loading: false,
    error: false,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Cateogory
      .addCase(addcategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Category
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.page = action.payload.page;
        state.totalpage = action.payload.totalpage;
        state.totalrecords = action.payload.totalrecords;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Delete Category
      .addCase(delCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(delCategory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(delCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit Category
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.singleItem = action.payload;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = CategorySlice.actions;
export default CategorySlice.reducer;
