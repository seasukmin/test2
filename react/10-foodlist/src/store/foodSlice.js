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
    lq: undefined,
    isLoading: "false",
    loadingError: "",
    order: "createdAt",
    hasNext: true,
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setHasNext: (state, action) => {
      state.hasNext = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.isLoading = "Loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        if (action.payload.isReset) {
          state.items = action.payload.resultData;
        } else {
          action.payload.resultData.forEach((data) => {
            state.items.push(data);
          });
          // state.items = [...state.items, ...action.payload.resultData];
        }
        // if (!action.payload.lastQuery) {
        //   state.hasNext = false;
        // } else {
        //   state.hasNext = true;
        // }
        state.hasNext = action.payload.lastQuery ? true : false;
        // state.hasNext = !!action.payload.lastQuery;
        // !!는 위에 값과 같다.
        // !(!action.payload.lastQuery)안이 false(undefined)면 true true면 false
        state.lq = action.payload.lastQuery;
        state.isLoading = "false";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = "false";
        state.loadingError = action.payload;
      })
      .addCase(updateItems.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
        state.isLoading = false;
      });
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
      resultData.isReset = !queryOptions.lastQuery ? true : false;
      return resultData;
    } catch (error) {
      return "FETCH Error:" + error;
      // console.log("FETCH Error:", error);
    }
  }
);
fetchItems("food");
const addItems = createAsyncThunk(
  "item/addItem",
  async ({ collectionName, addObj }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return resultData;
    } catch (error) {
      console.log("ADD Error", error);
    }
  }
);

const updateItems = createAsyncThunk(
  "item/updateItem",
  async ({ collectionName, docId, updateObj, imgUrl }) => {
    try {
      const resultData = await updateDatas(
        collectionName,
        docId,
        updateObj,
        imgUrl
      );
      return resultData;
    } catch (error) {
      console.log("UPDATE Error", error);
    }
  }
);

export default foodSlice;
export { fetchItems, addItems, updateItems };
export const { setOrder } = foodSlice.actions;
