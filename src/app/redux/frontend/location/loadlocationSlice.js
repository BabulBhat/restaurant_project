import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const getLocation = createAsyncThunk("loadlocation", async(thunkApi) => {
    try {
        const res = await fetch(`${baseUrl}/api/frontend/location`, {
            method: "GET",
        });
        const result = await res.json();
        if(!res.ok){
            return thunkApi.rejectWithValue(data.message)
        }
        return result.result;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})

const loadlocationSlice = createSlice({
    name : "loadlocation",
    initialState : {
        data : [],
        loading: false,
        error: null
    },
    reducers : {

    },
    extraReducers : (builder) => {
        builder
            .addCase(getLocation.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLocation.fulfilled,(state,action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getLocation.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})


export const { } = loadlocationSlice.actions;
export default loadlocationSlice.reducer;