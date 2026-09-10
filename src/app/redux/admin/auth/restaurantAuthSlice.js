import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

// Registration Restaurant Api
export const RestaurantRegisterAuth = createAsyncThunk("restaurantregister", async (userData, thunkApi) => {
    try {
        const res = await fetch(`${baseUrl}/api/admin/restaurant`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        const data = await res.json();
        if (!res.ok) {
            return thunkApi.rejectWithValue(data.message)
        }
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})


// Login Restaurant Api
export const RestaurantLoginAuth = createAsyncThunk('restaurantlogin', async (userdata, thunkApi) => {
    try {
        const res = await fetch(`${baseUrl}/api/admin/restaurant`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userdata)
        })
        const data = await res.json();
        if (!res.ok) {
            return thunkApi.rejectWithValue(data.message)
        }
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})

// Profile Show
export const RestaurantProfile = createAsyncThunk('restaurantprofile', async (token, thunkApi) => {
    try {
        const res = await fetch(`${baseUrl}/api/admin/restaurant`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `babul ${token}`
            }
        })
        const data = await res.json();
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})


// Profile Update
export const RestaurantprofileUpdate = createAsyncThunk('restaurantprofileUpdate', async (userdata, thunkApi) => {

    try {
        const res = await fetch(`${baseUrl}/api/admin/restaurant/${userdata.id}`, {
            method: "PUT",
            body: JSON.stringify(userdata)
        })
        const result = await res.json();
        return result;

    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})


const restaurantregisterSlice = createSlice({
    name: 'restaurantsignup',
    initialState: {
        data: [],
        message: null,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.message = null;
            state.loading = false;
            state.error = null;
            state.data = [];
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(RestaurantRegisterAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(RestaurantRegisterAuth.fulfilled, (state, action) => {
                state.message = action.payload;
                state.loading = false;
            })
            .addCase(RestaurantRegisterAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })




            // login Case
            .addCase(RestaurantLoginAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(RestaurantLoginAuth.fulfilled, (state, action) => {
                state.message = action.payload;
                state.loading = false;
            })

            .addCase(RestaurantLoginAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            // Profile Show
            .addCase(RestaurantProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(RestaurantProfile.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(RestaurantProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});






export const { logout } = restaurantregisterSlice.actions;
export default restaurantregisterSlice.reducer;