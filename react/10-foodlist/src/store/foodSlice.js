import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDatas,
  getDatas,
  getDatasByOrderLimit,
  updateDatas,
} from "../api/firebase";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    items: [],
    error: null,
    lq: undefined,
    isLoading: "idle",
    loadingError: "",
  },
  // dispatch({type:"", payload:{resultData, lastQuery}})
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.isLoading = "Loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload.resultData;
        state.lq = action.payload.lastQuery;
        state.isLoading = "complete";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = "fail";
        state.loadingError = action.payload;
      });
    // .addCase(addItems.fulfilled, (state, action) => {
    //   state.items.push(action.payload);
    //   state.status = "complete";
    // })
    // .addCase(updateItems.fulfilled, (state, action) => {
    //   state.items = state.items.map((item) =>
    //     item.id === action.payload.id ? action.payload : item
    //   );
    // });
  },
});

const fetchItems = createAsyncThunk(
  "items/fetchAllItems",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatasByOrderLimit(
        collectionName,
        queryOptions
      );

      return resultData;
    } catch (error) {
      return "FETCH Error:" + error;
      // console.log("FETCH Error:", error);
    }
  }
);
// fetchItems("food");
// const addItems = createAsyncThunk(
//   "item/addItem",
//   async ({ collectionName, addObj }) => {
//     try {
//       const resultData = await addDatas(collectionName, addObj);
//       return resultData;
//     } catch (error) {
//       console.log("ADD Error", error);
//     }
//   }
// );

// const updateItems = createAsyncThunk(
//   "item/updateItem",
//   async ({ collectionName, docId, updateObj }) => {
//     try {
//       const resultData = await updateDatas(collectionName, docId, updateObj);
//       return resultData;
//     } catch (error) {
//       console.log("UPDATE Error", error);
//     }
//   }
// );

export default foodSlice;
export { fetchItems };
