import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import categoriesSlice from "./categories/categoriesSlice";
import cartSlice from "./cart/cartSlice";
import userSlice from "./user/UserSlice";
import productSlice from "./products/productSlice";

export const store = configureStore({
  reducer: {
    productsSlice,
    productSlice,
    categoriesSlice,
    cartSlice,
    userSlice,
  },
});
