import { configureStore } from "@reduxjs/toolkit";
import restaurantregisterSlice from "./restaurantAuthSlice";
import foodSlice from "./foodSlice";
import CategorySlice from "./categorySlice";
export const store = configureStore({
    reducer: {
        registerAuth: restaurantregisterSlice,
        food: foodSlice,
        category: CategorySlice
    }
})