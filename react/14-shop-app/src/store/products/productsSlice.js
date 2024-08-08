import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    return null;
  } catch (error) {
    return null;
  }
});

export default productsSlice.reducer;
export { fetchProducts };
