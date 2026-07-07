import { configureStore } from "@reduxjs/toolkit";
import restaurantregisterSlice from "./restaurantAuthSlice";
import foodSlice from "./foodSlice";
export const store = configureStore({
    reducer: {
        registerAuth: restaurantregisterSlice,
        food: foodSlice
    }
})