import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDatas,
  deleteDatas,
  getDatas,
  getUserAuth,
  updateDatas,
} from "../api/firebase";

// const auth = getUserAuth();
const diarySlice = createSlice({
  name: "diary",
  initialState: {
    items: [],
    error: null,
    status: "welcome",
  },
  reducers: {
    authObject: (state, action) => {
      console.assert(state);
    },
  },
  extraReducers: (builder) => {
    // 비동기작업은 actionCreator 를 자동으로 만들어주지 못한다.
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "compelete";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "fail";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = "complete";
        console.log(state);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.status = "complete";
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.docId !== action.payload
        );
        state.status = "complete";
      });
  },
});

const fetchItems = createAsyncThunk(
  "items/fetchAllItems",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.log("FETCH Error: ", error);
    }
  }
);

const addItem = createAsyncThunk(
  "items/addItem",
  async ({ collectionName, addObj }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return resultData;
    } catch (error) {
      console.log("ADD Error:", error);
    }
  }
);
const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ collectionName, docId, updateObj }) => {
    try {
      const resultData = await updateDatas(collectionName, docId, updateObj);
      return resultData;
    } catch (error) {
      console.log("update Error:", error);
    }
  }
);
const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async ({ collectionName, docId }) => {
    try {
      const resultData = await deleteDatas(collectionName, docId);
      return resultData;
    } catch (error) {
      console.log("update Error:", error);
    }
  }
);

export default diarySlice;
export { fetchItems, addItem, updateItem, deleteItem };
