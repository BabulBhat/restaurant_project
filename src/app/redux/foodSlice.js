import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Get Food
export const getFood = createAsyncThunk('getfood', async (token, thunkApi) => {
    try {
        const res = await fetch(`http://localhost:3000/api/admin/food`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `${token}`
            }
        })
        const result = await res.json();
        if (result.error) {
            return thunkApi.rejectWithValue(error.message)
        }
        return result;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})



// Add Food
export const addFoodApi = createAsyncThunk('addfood', async (userdata, { dispatch }, thunkApi) => {
    try {
        const res = await fetch(`http://localhost:3000/api/admin/food`, {
            method: "POST",
            body: JSON.stringify(userdata)
        })
        const result = await res.json();
        if (result) {
            dispatch(getFood(userdata.tokenresto))
        }
        return result;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})




// Delete Food
export const delFood = createAsyncThunk('delfood', async (userid, thunkApi) => {
    console.log(userid);

    try {
        // const res = await fetch(`http://localhost:3000/api/admin/food/`)
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})

const foodSlice = createSlice({
    name: "food",
    initialState: {
        data: [],
        message: null,
        loading: false,
        error: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFoodApi.pending, (state) => {
                state.loading = true
            })
            .addCase(addFoodApi.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(addFoodApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })



            .addCase(getFood.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFood.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getFood.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })


        .addCase(delFood.pending, (state) => {
            state.loading = true;
        })
        .addCase(delFood.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(delFood.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export const { } = foodSlice.actions;
export default foodSlice.reducer;