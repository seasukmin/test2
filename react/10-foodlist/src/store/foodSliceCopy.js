import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDatas, getDatasByOrder, updateDatas } from "../api/firebase";

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
        }
        state.hasNext = action.payload.lastQuery ? true : false;
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
      const resultData = await getDatasByOrder(collectionName, queryOptions);
      resultData.isReset = !queryOptions.lastQuery ? true : false;
      return resultData;
    } catch (error) {
      return "FETCH Error" + error;
    }
  }
);
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
      const resultDate = await updateDatas(
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
