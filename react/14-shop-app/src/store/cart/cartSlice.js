import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { increment } from "firebase/firestore";
import { deleteDatas } from "../../firebase";

const initialState = {
  products: localStorage.getItem("cartProducts")
    ? JSON.parse(localStorage.getItem("cartProducts"))
    : [],
  totalPrice: 0,
  userId: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push({
        ...action.payload,
        quantity: 1,
        total: action.payload.price,
      });
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    deleteFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    getTotalPrice: (state) => {
      state.totalPrice = state.products.reduce(
        (acc, product) => (acc += product.total),
        0
      );
    },
    incrementProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      state.products[index].quantity += 1;
      state.products[index].total += state.products[index].price;
    },
    decrementProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      state.products[index].quantity -= 1;
      state.products[index].total -= state.products[index].price;
    },
  },
});

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ collectionName, productId }, thunkAPI) => {
    const resultData = await deleteDatas(collectionName, productId);
    try {
      if (resultData) {
        thunkAPI.dispatch(deleteFromCart(productId));
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Error Delete CartItem");
    }
  }
);

export default cartSlice.reducer;
export const {
  addToCart,
  getTotalPrice,
  incrementProduct,
  decrementProduct,
  deleteFromCart,
} = cartSlice.actions;
