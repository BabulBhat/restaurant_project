import { configureStore } from "@reduxjs/toolkit";
import restaurantregisterSlice from "./admin/auth/restaurantAuthSlice";
import foodSlice from "./admin/food/foodSlice";
import CategorySlice from "./admin/category/categorySlice";
import allcategorySlice from "./frontend/allcategory/allcategorySlice";
export const store = configureStore({
    reducer: {
        registerAuth: restaurantregisterSlice,
        food: foodSlice,
        category: CategorySlice,
        allcategory : allcategorySlice
    }
})