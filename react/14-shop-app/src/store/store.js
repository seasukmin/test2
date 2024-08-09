import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import categoriesSlice from "./categories/categoriesSlice";

export const store = configureStore({
  reducer: {
    productsSlice,
    categoriesSlice,
  },
});
