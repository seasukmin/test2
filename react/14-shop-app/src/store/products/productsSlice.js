import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../firebase";

const initialState = {
  products: [],
  isLoading: false,
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ collectionName, queryOptions }) => {
    const resultData = await getDatas(collectionName, queryOptions);
    try {
      return resultData;
    } catch (error) {
      return null;
    }
  }
);

export default productsSlice.reducer;
export { fetchProducts };
// dispatch는 set함수와 역할이 비슷하나 전체적으로 다 변경해준다..
// dispatch(fetchProducts("payload와", ㅇ라이;라))
